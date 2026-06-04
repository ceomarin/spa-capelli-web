import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ceomarin.github.io/spa-capelli-web',
  base: '/spa-capelli-web',
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