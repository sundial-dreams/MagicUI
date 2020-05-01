const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const webpackBaseConfig = require('./webpack.base.config');

module.exports = merge.smart(webpackBaseConfig, {
  devtool: 'none',

  mode: 'development',

  target: 'node',

  entry: path.join(__dirname, 'app/main/main.ts'),

  output: {
    path: path.join(__dirname, 'dist/main'),
    filename: 'main.dev.js'
  },

  externals: [nodeExternals()],

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    })
  ],
  node: {
    __dirname: false,
    __filename: false
  }
});