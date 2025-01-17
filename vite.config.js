export default {
  root: 'src',
  build: {
    outDir: '../dist',
    target: 'esnext',
    rollupOptions: {
      input: {
        main: 'src/index.html',
        serviceWorker: 'src/serviceworker.js',
        webmanifest: 'src/app.webmanifest'
      }
    }
  },
  optimizeDeps: {
    include: [] // Leave this empty or include actual npm dependencies if needed
  }
}
