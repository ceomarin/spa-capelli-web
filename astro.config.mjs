import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://docs.astro.build/en/guides/deploy/github/
export default defineConfig({
  site: 'https://ceodevops.github.io',
  base: '/spa-capelli-web',
  integrations: [sitemap()],
  output: 'static',
  build: {
    assets: '_assets',
  },
  image: {
    // Images are external/local, not embedded as base64
    remotePatterns: [],
  },
  compressHTML: true,
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
