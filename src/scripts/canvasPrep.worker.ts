// Worker side of canvasPrep.ts: receives the decoded image, runs the pixel
// passes, and hands back ImageBitmaps the canvases can draw directly.
import { computePasses, type PrepParams } from './canvasPrep';

const ctx = self as unknown as {
  onmessage: ((e: MessageEvent<{ bitmap: ImageBitmap; params: PrepParams }>) => void) | null;
  postMessage(message: unknown, transfer?: Transferable[]): void;
};

ctx.onmessage = (e) => {
  try {
    const { bitmap, params } = e.data;
    const iw = bitmap.width;
    const ih = bitmap.height;
    const canvas = new OffscreenCanvas(iw, ih);
    const c2d = canvas.getContext('2d', { willReadFrequently: true })!;
    c2d.drawImage(bitmap, 0, 0);
    bitmap.close();
    const passes = computePasses(c2d.getImageData(0, 0, iw, ih).data, iw, ih, params);
    const toBitmap = (data: Uint8ClampedArray) => {
      c2d.putImageData(new ImageData(data, iw, ih), 0, 0);
      return canvas.transferToImageBitmap();
    };
    const baseDim = toBitmap(passes.dim);
    const bright = toBitmap(passes.bright);
    const lumAlpha = toBitmap(passes.lum);
    ctx.postMessage({ iw, ih, baseDim, bright, lumAlpha, glints: passes.glints }, [baseDim, bright, lumAlpha]);
  } catch (err) {
    ctx.postMessage({ error: String(err) });
  }
};
