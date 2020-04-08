// 渲染进程dev环境下的webpack配置，主进程不使用webpack打包

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {spawn} = require('child_process');

const webpackBaseConfig = require('./webpack.base.config');


const port = process.env.PORT || 8080;
const publicPath = `http://localhost:${port}/dist`;

module.exports = merge.smart(webpackBaseConfig, {
  devtool: 'inline-source-map',

  mode: 'development',

  target: 'electron-renderer',

  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${port}/`,
    'webpack/hot/only-dev-server',
    require.resolve('./app/renderer/index.tsx')
  ],

  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },

  output: {
    publicPath,
    filename: 'renderer.dev.js'
  },

  module: {
    rules: [
      {
        test: /\.global\.css$/,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {sourceMap: true}
          }
        ]
      },
      {
        test: /^((?!\.global).)*\.css$/,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]'
              },
              sourceMap: true,
              importLoaders: 1
            }
          }
        ]
      },
      // SCSS | SASS support that handle .global.scss
      {
        test: /\.global\.(scss|sass)$/,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {sourceMap: true}
          },
          {loader: 'sass-loader'}
        ]
      },
      // SASS | SCSS support that handle .scss
      {
        test: /^((?!\.global).)*\.(scss|sass)$/,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]'
              },
              sourceMap: true,
              importLoaders: 1
            }
          },
          {loader: 'sass-loader'}
        ]
      },
      // Image import support
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        use: 'url-loader'
      },
      // font support
      {
        test: /\.woff(\?v=\d+\.\d+\/\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff'
          }
        }
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff'
          }
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream'
          }
        }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/svg+xml'
          }
        }
      }

    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin({
      multiStep: false
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      scriptLoading: 'defer',
      template: path.join(__dirname, 'resources/template/template.html'),
      minify: false
    })
  ],
  devServer: {
    port,
    publicPath,
    compress: true,
    noInfo: false,
    stats: 'errors-only',
    inline: true,
    lazy: false,
    hot: true,
    headers: {'Access-Control-Allow-Origin': '*'},
    contentBase: path.join(__dirname, 'dist'),
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 100
    },
    historyApiFallback: {
      verbose: true,
      disableDotRule: false
    },
    before() {
      console.log('start main process...');
      spawn('npm', ['run', 'start-main-dev'], {
        shell: true,
        env: process.env,
        stdio: 'inherit'
      }).on('close', code => process.exit(code))
        .on('error', spawnError => console.error(spawnError));
    }
  }
});