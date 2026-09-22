import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        vtu: resolve(__dirname, 'vtu.html'),
        vtuUpdates: resolve(__dirname, 'vtu-updates.html'),
        internships: resolve(__dirname, 'internships.html'),
        courses: resolve(__dirname, 'courses.html'),
        resources: resolve(__dirname, 'resources.html'),
        kcet: resolve(__dirname, 'kcet.html'),
        career: resolve(__dirname, 'career.html'),
        contact: resolve(__dirname, 'contact.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
