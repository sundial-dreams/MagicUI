// 渲染进程dev环境下的webpack配置，主进程不使用webpack打包

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {spawn} = require('child_process');

const webpackBaseConfig = require('./webpack.base.config');


const port = process.env.PORT || 8080;
const publicPath = `http://localhost:${port}/dist`;

const hot = [
  'react-hot-loader/patch',
  `webpack-dev-server/client?http://localhost:${port}/`,
  'webpack/hot/only-dev-server',
];

const entry = {
  main: hot.concat(require.resolve('./app/renderer/main/index.tsx')),
  user: hot.concat(require.resolve('./app/renderer/user/index.tsx')),
  code: hot.concat(require.resolve('./app/renderer/code/index.tsx')),
  webgl: hot.concat(require.resolve('./app/renderer/webgl/index.tsx')),
  login: hot.concat(require.resolve('./app/renderer/login/index.tsx')),
  avatar: hot.concat(require.resolve('./app/renderer/avatar/index.tsx'))
};

const htmlWebpackPlugin = Object.keys(entry).map(name => new HtmlWebpackPlugin({
  inject: 'body',
  scriptLoading: 'defer',
  template: path.join(__dirname, 'resources/template/template.html'),
  minify: false,
  filename: `${name}.html`,
  chunks: [name]
}));

module.exports = merge.smart(webpackBaseConfig, {
  devtool: 'inline-source-map',

  mode: 'development',

  target: 'electron-renderer',

  entry,

  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },

  output: {
    publicPath,
    filename: '[name].dev.js'
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
          },
          {loader: 'resolve-url-loader'},
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
          },
          {loader: 'resolve-url-loader'}
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
          {loader: 'resolve-url-loader'},
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
          {loader: 'resolve-url-loader'},
          {loader: 'sass-loader'}
        ]
      },
      // Image import support
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 5000
          }
        }
      },
      // font support
      {
        test: /\.woff(\?v=\d+\.\d+\/\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 5000,
            mimetype: 'application/font-woff'
          }
        }
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 5000,
            mimetype: 'application/font-woff'
          }
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 5000,
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
            limit: 5000,
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
    ...htmlWebpackPlugin
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