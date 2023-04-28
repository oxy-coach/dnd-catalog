'use strict'

const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const WebpackCommonConfig = require('./webpack.config.common')

module.exports = {
  mode: 'production',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  ...WebpackCommonConfig,
  plugins: [
    new SWPrecacheWebpackPlugin({
      cacheId: 'my-vue-app',
      filename: 'service-worker.js',
      staticFileGlobs: ['dist/**/*.{js,html,css}'],
      minify: true,
      stripPrefix: 'dist/'
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
}
