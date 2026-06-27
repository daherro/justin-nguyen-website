// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// `site` is the production URL — used for canonical URLs, the sitemap, and
// the RSS feed. Update this if you later add a custom domain.
export default defineConfig({
  site: 'https://justin-nguyen-six.vercel.app',
  integrations: [sitemap()],
  output: 'static',
});
