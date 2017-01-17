'use strict'
const path = require('path')
const webpack = require('webpack')
const config = require('./config')
const ExtractCSSPlugin = require('./extractCSSPlugin')

const postcss = {
  plugins: [
    require('autoprefixer')({
      browsers: config.browsers
    })
  ]
}

let webpack_base = {
  devtool: config.debug ? 'cheap-module-eval-source-map' : false,
  entry: config.entry,
  output: {
    path: config.assets_path,
    filename: config.debug ? '[name].js' : '[name].[chunkhash:8].js',
    publicPath: config.assets_url
  },
  resolve: {
    extensions: ['.js', '.vue', '.css', '.json'],
    alias: {
      root: path.join(__dirname, '../js'),
      components: path.join(__dirname, '../js/components'),
      vue: 'vue/dist/vue.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /libs/],
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        exclude: [/node_modules/],
        loader: 'vue-loader'
      },
      {
        test: /\.scss$/,
        loader:ExtractCSSPlugin.extract({
          fallbackLoader: "style-loader",
          loader: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      },
      {
        test: /\.css$/,
        loader: ExtractCSSPlugin.extract({
          fallbackLoader: "style-loader",
          loader: ['css-loader', 'postcss-loader']
        })
      }, {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf|wav)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          query: {
            limit: 10,
            name: '[name].[hash:7].[ext]'
          }
        }],

      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: postcss,
        vue: {
          loaders: {
            scss: ExtractCSSPlugin.extract({
              fallbackLoader: "vue-style-loader",
              loader: ['css-loader', 'postcss-loader', 'sass-loader']
            }),
            js: 'babel-loader'
          },
          postcss: postcss
        }
      }
    }),
    new ExtractCSSPlugin({
      filename: '[name].[contenthash:8].css',
      disable: config.debug
    })
  ],
  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" }
  },
  performance: {
    hints: config.debug ? false : 'warning'
  }
}

module.exports = webpack_base
