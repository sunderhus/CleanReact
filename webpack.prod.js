/* eslint-disable quote-props */
const webpack = require('webpack')
const common = require('./webpack.common')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      use: [{
        loader: MiniCssExtractPlugin.loader
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
    }]
  },
  externals: {
    react: 'React',
    axios: 'axios',
    'react-dom': 'ReactDOM'
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      'API_URL': 'https://fordevs.herokuapp.com/api'
    }),
    new HtmlWebpackPlugin({
      template: './template.prod.html',
      favicon: './public/favicon.png'
    }),
    new MiniCssExtractPlugin({
      filename: 'main-bundle-[contenthash].css'
    })
  ]
})
