import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  ssr: true,
  modules: [
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    '@nuxt/image',
  ],
  css: ['normalize.css/normalize.css', '~/assets/stylus/app.styl'],

  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Ismail9k.com',
      short_name: 'Ismail9k',
      description:
        "A personal blog, blend of my life's work, experiences, challenges, and thoughts, captured as they come. Join me on this introspective journey.",
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#3fa66f',
      lang: 'en-US',
      status_bar_style: 'default',
      icons: [
        {
          src: '/icons/icon-16x16.png',
          sizes: '16x16',
          type: 'image/png',
        },
        {
          src: '/icons/icon-32x32.png',
          sizes: '32x32',
          type: 'image/png',
        },
        {
          src: '/icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      navigateFallback: '/',
    },
    devOptions: {
      enabled: true,
      type: 'module',
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
          content: 'http://ismail9k.com/icons/icon-512x512.png',
        },
        { property: 'og:image:type', content: 'image/png' },
        { property: 'og:image:alt', content: 'ismail9k' },
      ],

      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  runtimeConfig: {
    public: {
      // TODO: move it to private keys
      googleSafeBrowsingApiKey:
        process.env.NUXT_GOOGLE_SAFE_BROWSING_API_KEY || '',
    },
  },

  compatibilityDate: '2024-10-02',
});
