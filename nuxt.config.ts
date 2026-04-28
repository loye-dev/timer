// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: false,
  devtools: { enabled: true },
  vite: {
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit'],
    },
  },
  modules: ['@nuxt/ui', '@nuxtjs/plausible', '@nuxt/eslint'],
  icon: {
    clientBundle: {
      scan: true,
    },
  },
  plausible: {
    enabled: !!process.env.PLAUSIBLE_DOMAIN,
    apiHost: process.env.PLAUSIBLE_URL || '',
    domain: process.env.PLAUSIBLE_DOMAIN || '',
    autoOutboundTracking: true,
  },
  css: ['~/assets/css/main.css'],
})
