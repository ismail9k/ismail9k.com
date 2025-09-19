export default defineNuxtPlugin(() => {
  const { trackScrollDepth } = useTracking()
  const router = useRouter()
  const route = useRoute()

  // Note: Page views are automatically tracked by your existing gtag setup
  
  // Track route changes for scroll depth reset only
  router.afterEach((to) => {
    // Reset scroll tracking on route change
    scrollDepthTracked = {
      25: false,
      50: false,
      75: false,
      100: false
    }
  })

  // Scroll depth tracking
  let scrollDepthTracked = {
    25: false,
    50: false,
    75: false,
    100: false
  }

  const trackScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    )

    Object.keys(scrollDepthTracked).forEach(threshold => {
      if (scrollPercent >= parseInt(threshold) && !scrollDepthTracked[threshold]) {
        scrollDepthTracked[threshold] = true
        trackScrollDepth(threshold, route.path)
      }
    })
  }


  // Add scroll listener
  if (import.meta.client) {
    window.addEventListener('scroll', trackScroll, { passive: true })
  }
})