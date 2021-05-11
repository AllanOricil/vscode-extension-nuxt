import WebpackObfuscator from 'webpack-obfuscator';
import webpack from 'webpack';

export default {
  target: 'static',
  ssr: false,
  env: {
    LOCALHOST_API: 'http://localhost:5000'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Salesforce Query Editor',
    htmlAttrs: {
      lang: 'en',
      ...(process.env === 'dev' && {oncontextmenu: 'return false'})
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { 'http-equiv': 'cache-control', content: 'no-cache'},
      { 'http-equiv': 'cache-control', content: '0'},
      { 'http-equiv': 'cache-control', content: 'Tue, 01 Jan 1980 1:00:00 GMT'},
    ],
    link: [],
    script: [],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  components: true,

  generate: {
    fallback: '404.html'
  },

  buildModules: [],

  loading: {
    height: '0px'
  },

  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios'],

  axios: {},

  build: {
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map';
      }

      if (process.env.IS_VSCODE) {
        config.output.filename = 'app.js',
        config.output.chunkFilename = '[id].js';
        config.optimization.splitChunks.cacheGroups.default = false;
        config.optimization.runtimeChunk = false;
      }

      if (!ctx.isDev && ctx.isClient && config.plugins) {
        config.plugins.push(
          new WebpackObfuscator({
            compact: true,
            selfDefending: true,
            stringArray: true,
            rotateStringArray: true,
            shuffleStringArray: true,
            stringArrayThreshold: 0.8
          }, [])
        );
      }
    
      if(process.env.IS_VSCODE){
        const nuxtFontLoader = config.module.rules.find((rule) => String(rule.test) == String(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i));
        nuxtFontLoader.use = 'base64-inline-loader?limit=1000&name=[name].[ext]';

        const nuxtImageLoader = config.module.rules.find((rule) => String(rule.test) == String(/\.(png|jpe?g|gif|svg|webp|avif)$/i));
        nuxtImageLoader.use[0].options.limit = 2000000;
      }
    },

    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ]
  },

  router: {
    mode: 'hash',
  },
}
