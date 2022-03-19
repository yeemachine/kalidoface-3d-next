import { defineConfig } from 'vite';
import css from 'rollup-plugin-css-only';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [svelte()],
  build: {
    outDir:'docs',
    minify: false,
		target: "es2019",
    rollupOptions: {
      external: [
        "global.css", // ignore react stuff
      ],
    },
  },
});
