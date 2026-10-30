import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  plugins: [react()],
  server: { allowedHosts: ['terminal.local'] },
  base: isGitHubPages ? '/EVERNE-/' : '/',
});
