import { defineConfig } from 'vite';

const pageEntries = ['blogs', 'about', 'focus', 'experience', 'education', 'contact'];

export default defineConfig({
  build: {
    rollupOptions: {
      input: ['index.html', ...pageEntries.map((page) => `${page}/index.html`)],
    },
  },
});
