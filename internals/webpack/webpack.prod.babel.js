// Important modules this config uses
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const OfflinePlugin = require('offline-plugin');
const { HashedModuleIdsPlugin } = require('webpack');
const InlineSourcePlugin = require('html-webpack-inline-source-plugin');
const RobotstxtPlugin = require('robotstxt-webpack-plugin').default;
const webpack = require('webpack');

module.exports = require('./webpack.base.babel')({
  mode: 'production',

  // In production, we skip all hot-reloading stuff
  entry: [path.join(process.cwd(), 'app/app.js')],

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },

  optimization: {
    minimize: true,
    nodeEnv: 'production',
    sideEffects: true,
    concatenateModules: true,
    splitChunks: { chunks: 'all' },
    runtimeChunk: true,
  },

  plugins: [
    // Minify and optimize the index.html
    new webpack.DefinePlugin({
      GITHUB_ACCESS_TOKEN: JSON.stringify(null),
    }),
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
        // Inline all files which names start with “runtime~” and end with “.js”.
        // That’s the default naming of runtime chunks
      },
      inlineSource: 'runtime~.+\\.js',
      inject: true,
    }),

    // Put it in the end to capture all the HtmlWebpackPlugin's
    // assets manipulations and do leak its manipulations to HtmlWebpackPlugin
    new OfflinePlugin({
      relativePaths: false,
      publicPath: '/',
      appShell: '/',
      caches: {
        main: [':rest:'],

        // All chunks marked as `additional`, loaded after main section
        // and do not prevent SW to install. Change to `optional` if
        // do not want them to be preloaded at all (cached only when first loaded)
        additional: ['*.chunk.js'],
      },

      // Removes warning for about `additional` section usage
      safeToUseOptionalCaches: true,
    }),

    new WebpackPwaManifest({
      name: 'Github Issues',
      short_name: 'Issues',
      description: 'My React Boilerplate-based project!',
      background_color: '#fafafa',
      theme_color: '#005ca9',
      icons: [
        {
          src: path.resolve('app/images/icon-512x512.png'),
          sizes: [72, 96, 120, 128, 144, 152, 167, 180, 192, 384, 512],
        },
      ],
    }),

    new HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20,
    }),

    // This plugin enables the “inlineSource” option
    new InlineSourcePlugin(),
    new RobotstxtPlugin({
      policy: [
        {
          userAgent: '*',
          disallow: '',
        },
      ],
    }),
  ],

  performance: {
    assetFilter: assetFilename => !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
});
