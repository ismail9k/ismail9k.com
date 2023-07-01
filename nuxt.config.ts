// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  css: ['~/assets/stylus/app.styl'],

  experimental: {
    viewTransition: true,
  },
});
