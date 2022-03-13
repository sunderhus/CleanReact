/* eslint-disable quote-props */
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common')
const { merge } = require('webpack-merge')

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      use: [{
        loader: 'style-loader'
      },
      {
        loader: 'css-loader',
        options: {
          modules: true
        }
      },
      {
        loader: 'sass-loader',
        options: {
          implementation: require('sass')
        }
      }]
    }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './public',
    writeToDisk: true,
    historyApiFallback: true,
    port: 8080
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      'API_URL': 'https://fordevs.herokuapp.com/api'
    }),
    new HtmlWebpackPlugin({
      template: './template.dev.html'
    })
  ]
})
