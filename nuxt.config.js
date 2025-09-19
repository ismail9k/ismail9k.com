import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  // Enable SSR for build, but generate static site
  ssr: true,
  nitro: {
    prerender: {
      routes: ['/sitemap.xml'],
      crawlLinks: true,
    },
  },
  site: {
    url: 'https://ismail9k.com/',
    name: 'Ismail9k',
  },

  future: {
    compatibilityVersion: 4,
  },
  modules: [
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    'nuxt-og-image',
    '@nuxt/eslint',
  ],
  css: ['normalize.css/normalize.css', '~/assets/css/app.css'],

  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },

  // pwa: {
  //   registerType: 'autoUpdate',
  //   manifest: {
  //     name: 'Ismail9k.com',
  //     short_name: 'Ismail9k',
  //     description:
  //       "A personal blog, blend of my life's work, experiences, challenges, and thoughts, captured as they come. Join me on this introspective journey.",
  //     start_url: '/',
  //     display: 'standalone',
  //     background_color: '#ffffff',
  //     theme_color: '#3fa66f',
  //     lang: 'en-US',
  //     status_bar_style: 'default',
  //     icons: [
  //       {
  //         src: '/icons/icon-16x16.png',
  //         sizes: '16x16',
  //         type: 'image/png',
  //       },
  //       {
  //         src: '/icons/icon-32x32.png',
  //         sizes: '32x32',
  //         type: 'image/png',
  //       },
  //       {
  //         src: '/icons/icon-192x192.png',
  //         sizes: '192x192',
  //         type: 'image/png',
  //       },
  //       {
  //         src: '/icons/icon-512x512.png',
  //         sizes: '512x512',
  //         type: 'image/png',
  //       },
  //     ],
  //   },
  //   workbox: {
  //     navigateFallback: '/',
  //   },
  //   devOptions: {
  //     enabled: true,
  //     type: 'module',
  //   },
  // },

  experimental: {
    viewTransition: true,
    payloadExtraction: false,
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark',
          },
        },
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
        { property: 'profile:first_name', content: 'Abdelrahman' },
        { property: 'profile:last_name', content: 'Ismail' },
        { property: 'profile:username', content: 'ismail9k' },
        { property: 'profile:gender', content: 'male' },
        { property: 'og:type', content: 'profile' },
        {
          'http-equiv': 'Content-Security-Policy',
          content:
            'script-src \'self\' \'unsafe-inline\' \'unsafe-eval\' https://www.googletagmanager.com https://www.google-analytics.com; object-src \'none\';',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-CP91JY5YBF',
          async: true,
        },
        {
          children: 'window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag(\'js\', new Date()); gtag(\'config\', \'G-CP91JY5YBF\', { cookie_domain: \'ismail9k.com\' });',
          type: 'text/javascript',
        },
      ],
    },
  },

  compatibilityDate: '2024-12-01',
});
