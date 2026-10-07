// Pixel prep shared by the two raking-light canvases (LacquerCanvas, SonmaiCanvas):
// a dimmed base pass, a bright pass, a luminance alpha mask, and the glint scan.
// It is a few hundred ms of work on a phone, so it runs in a worker when the
// browser supports it and falls back to the main thread otherwise.

/** brightness, saturation, contrast, warm tilt (lifts red, trims blue) */
export type Grade = [br: number, sat: number, con: number, warm: number];

export interface PrepParams {
  src: string;
  dim: Grade;
  bright: Grade;
  /** luminance mask: L * (base + warmGain * warm), then ((L - floor) / (1 - floor)) ^ gamma */
  mask: { base: number; warmGain: number; floor: number; gamma: number };
  /** glint scan: grid step is max(minStep, width / div); keep points brighter and warmer than the minimums */
  glint: { minStep: number; div: number; minL: number; minWarm: number; speed: number; speedRange: number };
}

export interface Glint {
  ix: number;
  iy: number;
  l: number;
  ph: number;
  sp: number;
}

export interface Prep {
  iw: number;
  ih: number;
  baseDim: CanvasImageSource;
  bright: CanvasImageSource;
  lumAlpha: CanvasImageSource;
  glints: Glint[];
}

export interface Passes {
  dim: Uint8ClampedArray;
  bright: Uint8ClampedArray;
  lum: Uint8ClampedArray;
  glints: Glint[];
}

// Brightness/saturate/contrast are applied in pixel space rather than via
// ctx.filter, which older iOS Safari/WebKit silently ignores (leaving the base
// image at full brightness and killing the glow's contrast on mobile).
function grade(d: Uint8ClampedArray, [br, sat, con, warm]: Grade) {
  const p = new Uint8ClampedArray(d.length);
  for (let i = 0; i < d.length; i += 4) {
    let r = d[i] * br * (1 + warm),
      g = d[i + 1] * br * (1 + warm * 0.35),
      b = d[i + 2] * br * (1 - warm);
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    r = lum + sat * (r - lum);
    g = lum + sat * (g - lum);
    b = lum + sat * (b - lum);
    // Uint8ClampedArray clamps to 0..255 on assignment
    p[i] = (r - 127.5) * con + 127.5;
    p[i + 1] = (g - 127.5) * con + 127.5;
    p[i + 2] = (b - 127.5) * con + 127.5;
    p[i + 3] = d[i + 3];
  }
  return p;
}

/** Pure pixel math: no DOM, so it runs the same in a worker or on the main thread. */
export function computePasses(d: Uint8ClampedArray, iw: number, ih: number, params: PrepParams): Passes {
  const { mask, glint } = params;
  const lum = new Uint8ClampedArray(d.length);
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i],
      g = d[i + 1],
      b = d[i + 2];
    let L = (0.5 * r + 0.42 * g + 0.08 * b) / 255;
    const warm = Math.max(0, (r + g) / 2 - b) / 255;
    L = Math.min(1, L * (mask.base + mask.warmGain * warm));
    let a = (L - mask.floor) / (1 - mask.floor);
    a = a < 0 ? 0 : a;
    a = Math.pow(a, mask.gamma);
    lum[i] = 255;
    lum[i + 1] = 255;
    lum[i + 2] = 255;
    lum[i + 3] = Math.round(a * 255);
  }

  const glints: Glint[] = [];
  const step = Math.max(glint.minStep, Math.round(iw / glint.div));
  for (let y = step; y < ih - step; y += step) {
    for (let x = step; x < iw - step; x += step) {
      const i = (y * iw + x) * 4;
      const r = d[i],
        g = d[i + 1],
        b = d[i + 2];
      const L = (0.5 * r + 0.42 * g + 0.08 * b) / 255;
      const warm = Math.max(0, (r + g) / 2 - b) / 255;
      if (L > glint.minL && warm > glint.minWarm)
        glints.push({
          ix: x,
          iy: y,
          l: L,
          ph: Math.random() * 6.28,
          sp: glint.speed + Math.random() * glint.speedRange,
        });
    }
  }

  return { dim: grade(d, params.dim), bright: grade(d, params.bright), lum, glints };
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const im = new Image();
    im.onload = () => resolve(im);
    im.onerror = reject;
    im.src = src;
  });
}

function prepareOnMain(img: HTMLImageElement, params: PrepParams): Prep {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const mk = () => {
    const c = document.createElement('canvas');
    c.width = iw;
    c.height = ih;
    return c;
  };
  const plain = mk();
  const px = plain.getContext('2d')!;
  px.drawImage(img, 0, 0);
  const passes = computePasses(px.getImageData(0, 0, iw, ih).data, iw, ih, params);
  const toCanvas = (data: Uint8ClampedArray) => {
    const c = mk();
    c.getContext('2d')!.putImageData(new ImageData(data, iw, ih), 0, 0);
    return c;
  };
  return {
    iw,
    ih,
    baseDim: toCanvas(passes.dim),
    bright: toCanvas(passes.bright),
    lumAlpha: toCanvas(passes.lum),
    glints: passes.glints,
  };
}

function prepareInWorker(img: HTMLImageElement, params: PrepParams): Promise<Prep> {
  return createImageBitmap(img).then(
    (bitmap) =>
      new Promise<Prep>((resolve, reject) => {
        const worker = new Worker(new URL('./canvasPrep.worker.ts', import.meta.url), { type: 'module' });
        const done = () => worker.terminate();
        worker.onmessage = (e: MessageEvent<Prep | { error: string }>) => {
          done();
          if ('error' in e.data) reject(new Error(e.data.error));
          else resolve(e.data);
        };
        worker.onerror = (e) => {
          done();
          reject(e);
        };
        worker.postMessage({ bitmap, params }, [bitmap]);
      })
  );
}

/** Load the image and build its prep, off the main thread where possible. */
export async function prepareImage(params: PrepParams): Promise<Prep> {
  // The <img> load reuses the page's <link rel="preload"> for the texture.
  const img = await loadImage(params.src);
  const canUseWorker =
    typeof Worker !== 'undefined' &&
    typeof OffscreenCanvas !== 'undefined' &&
    typeof createImageBitmap === 'function';
  if (canUseWorker) {
    try {
      return await prepareInWorker(img, params);
    } catch {
      // fall through to the main-thread path
    }
  }
  return prepareOnMain(img, params);
}
