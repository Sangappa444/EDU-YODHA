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
        contact: resolve(__dirname, 'contact.html'),
        privacyPolicy: resolve(__dirname, 'privacy-policy.html'),
        termsAndConditions: resolve(__dirname, 'terms-and-conditions.html'),
        disclaimer: resolve(__dirname, 'disclaimer.html'),
        editorialPolicy: resolve(__dirname, 'editorial-policy.html'),
        articles: resolve(__dirname, 'articles.html'),
        vtuSgpaGuide: resolve(__dirname, 'vtu-sgpa-cgpa-calculator-guide.html'),
        vtuRevalGuide: resolve(__dirname, 'vtu-revaluation-challenge-valuation-guide.html'),
        kcetOptionGuide: resolve(__dirname, 'kcet-option-entry-counseling-guide.html'),
        vtuGraceGuide: resolve(__dirname, 'vtu-grace-marks-backlog-rules-guide.html'),
        cseRoadmapGuide: resolve(__dirname, 'cse-engineering-roadmap-guide.html'),
        resourceDetail: resolve(__dirname, 'resource-detail.html'),
        dashboard: resolve(__dirname, 'dashboard.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
