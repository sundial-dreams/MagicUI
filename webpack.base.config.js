const path = require('path');
// 基础的webpack配置
module.exports = {
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.node$/,
        exclude: /node_modules/,
        use: 'node-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.node'],
    alias: {
      '~native': path.resolve(__dirname, 'native'),
      '~config': path.resolve(__dirname, 'config'),
      '~resources': path.resolve(__dirname, 'resources')
    }
  },
  devtool: 'source-map',
  plugins: []
};