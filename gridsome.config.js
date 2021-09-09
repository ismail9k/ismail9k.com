// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

module.exports = {
  siteName: 'Ismail9k',
  siteUrl: 'https://ismail9k.com',
  siteDescription: 'Ismail9k, personal blog.',
  icon: {
    favicon: './src/assets/img/favicon.png',
    touchicon: './src/assets/img/touchicon.png',
  },
  plugins: [
    { use: 'gridsome-plugin-pug' },
    {
      use: '@gridsome/source-filesystem',
      options: {
        baseDir: './content/posts',
        path: '**/*.md',
        typeName: 'BlogPost',
        tags: {
          typeName: 'Tag',
          create: true,
        },
      },
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        baseDir: './content/experiences',
        path: '**/*.md',
        typeName: 'Experience',
      },
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        baseDir: './content/sub-experiences',
        path: '**/*.md',
        typeName: 'SubExperience',
      },
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        baseDir: './content/projects',
        path: '*.md',
        typeName: 'Project',
      },
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        baseDir: './content/socials',
        path: '*.md',
        typeName: 'Social',
      },
    },
    {
      use: 'gridsome-plugin-pwa',
      options: {
        title: 'Ismail9k.com',
        startUrl: '/',
        display: 'standalone',
        statusBarStyle: 'default',
        manifestPath: 'manifest.json',
        disableServiceWorker: false,
        serviceWorkerPath: 'service-worker.js',
        cachedFileTypes: 'js,json,css,html,png,jpg,jpeg,svg',
        shortName: 'Ismail9k',
        themeColor: '#3fa66f',
        backgroundColor: '#ffffff',
        icon: './src/assets/img/icon.jpg',
        msTileImage: '',
        msTileColor: '#00aba9',
        gcmSenderId: undefined,
      },
    },
    {
      use: 'gridsome-plugin-gtm',
      options: {
        id: 'GTM-532G58F',
        enabled: true,
      },
    },
  ],
  templates: {},
  transformers: {
    remark: {
      plugins: [],
    },
  },
  css: {
    loaderOptions: {
      stylus: {
        test: /\.styl$/,
        loader: 'stylus-loader',
      },
    },
  },
};
