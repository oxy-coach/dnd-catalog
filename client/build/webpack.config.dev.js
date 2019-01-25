'use strict'

const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackCommonConfig = require('./webpack.config.common')

module.exports = {
  mode: 'development',
  devServer: {
    hot: true,
    watchOptions: {
      poll: true
    }
  },
  ...WebpackCommonConfig,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
}
