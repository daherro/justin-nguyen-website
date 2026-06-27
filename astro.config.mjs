// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// IMPORTANT: update `site` to your real production domain before deploying.
// It is used for canonical URLs, the sitemap, and the RSS feed.
export default defineConfig({
  site: 'https://justinnguyen.dev',
  integrations: [sitemap()],
  output: 'static',
});
