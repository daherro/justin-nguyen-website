// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeExternalLinks from 'rehype-external-links';

// `site` is the production URL — used for canonical URLs, the sitemap, and
// the RSS feed. Update this if you later add a custom domain.
export default defineConfig({
  site: 'https://justintknguyen.com',
  integrations: [sitemap()],
  output: 'static',
  markdown: {
    // Open external links in blog posts in a new tab.
    rehypePlugins: [
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
    ],
  },
});
