import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ceodevops.github.io/spa-capelli-web',
  base: '/spa-capelli-web',
  integrations: [sitemap()],
  output: 'static',
  build: {
    assets: '_assets',
  },
  compressHTML: true,
  vite: {
    build: {
      cssMinify: true,
    },
  },
});