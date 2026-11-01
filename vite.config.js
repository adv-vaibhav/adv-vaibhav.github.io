import { defineConfig } from 'vite';
import { copyFileSync, mkdirSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

function blogPermalinks() {
  return {
    name: 'blog-permalinks',
    apply: 'build',
    closeBundle() {
      const output = resolve(process.cwd(), 'dist');
      const listingPage = resolve(output, 'blogs/index.html');
      for (const filename of readdirSync(resolve(process.cwd(), 'blogs'))) {
        if (!filename.endsWith('.md')) continue;
        const slug = filename.replace(/^\d+-/, '').replace(/\.md$/i, '').toLowerCase();
        const postDirectory = resolve(output, 'blogs', slug);
        mkdirSync(postDirectory, { recursive: true });
        copyFileSync(listingPage, resolve(postDirectory, 'index.html'));
      }
    },
  };
}

const pageEntries = ['blogs', 'about', 'focus', 'experience', 'education', 'contact'];

export default defineConfig({
  plugins: [blogPermalinks()],
  build: {
    rollupOptions: {
      input: ['index.html', ...pageEntries.map((page) => `${page}/index.html`)],
    },
  },
});
