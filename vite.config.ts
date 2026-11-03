import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  plugins: [react()],
  server: { allowedHosts: ['terminal.local'] },
  base: isGitHubPages ? '/EVERNE-/' : '/',
  build: {
    rollupOptions: {
      input: { current: path.resolve('index.html'), next: path.resolve('next.html') },
    },
  },
});
