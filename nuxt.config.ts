// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  modules: ['@nuxt/content'],
  css: ['normalize.css/normalize.css', '~/assets/stylus/app.styl'],
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },

  experimental: {
    viewTransition: true,
  },
});
