// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: true,
  modules: ['@nuxt/content', '@nuxtjs/color-mode', 'nuxt-purgecss'],
  css: ['normalize.css/normalize.css', '~/assets/stylus/app.styl'],
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },

  experimental: {
    viewTransition: true,
  },

  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
    },
  },

  colorMode: {
    classSuffix: '',
  },

  app: {
    head: {
      title: 'Ismail9k',
      meta: [
        { name: 'twitter:site', content: '@ismail.9k' },
        { name: 'twitter:card', content: 'summary' },
        {
          name: 'twitter:description',
          content: 'Abdelrahamn Ismail, personal blog webpage.',
        },
        {
          name: 'twitter:title',
          property: 'og:title',
          content: "Welcome to ismail9k's blog.",
        },

        { property: 'profile:first_name', content: 'Abdelrahman' },
        { property: 'profile:last_name', content: 'Ismail' },
        { property: 'profile:username', content: 'ismail9k' },
        { property: 'profile:gender', content: 'male' },
        { property: 'og:type', content: 'profile' },
        { property: 'og:url', content: 'http://ismail9k.com' },
        {
          property: 'og:image',
          name: 'twitter:image',
          content: 'http://ismail9k.com/cover.png',
        },
        { property: 'og:image:type', content: 'image/png' },
        { property: 'og:image:alt', content: 'ismail9k' },
      ],
    },
  },
});
