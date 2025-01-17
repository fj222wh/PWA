if ('serviceWorker' in navigator) {
  window.addEventListener('load', async function () {
    try {
      const registration = await navigator.serviceWorker.register('serviceworker.js')
      console.log('ServiceWorker: Registration successful with scope: ', registration.scope)
    } catch (error) {
      console.log('ServiceWorker: Registration failed: ', error)
    }
  })
}

const version = '1.0.0'

self.addEventListener('install', event => {
  console.log('ServiceWorker: Installed version ', version)

  /**
   * Cache all files.
   *
   * @returns {Promise} Promise that resolves to undefined.
   */
  const cacheAssets = async () => {
    const cache = await self.caches.open(version)
    console.log('ServiceWorker: Caching Files')
    return cache.addAll([
      'index.html',
      'css/styles.css'
    ])
  }
  event.waitUntil(cacheAssets)
})

self.addEventListener('activate', (event) => {
  console.log('Serviceworker: Activated version', version)
})
