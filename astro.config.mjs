import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://pty.ai',
  output: 'static',
  compressHTML: true,
  integrations: [sitemap()],
  redirects: {
    '/favicon.ico': '/favicon.svg',
  },
});
