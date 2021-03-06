'use strict'
const path = require('path')

const webpack = require('webpack')
var proxy = require('http-proxy-middleware')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * List of URL path
 **/
const clientPages = [
  'user',
  'event',
  'result',
  'wishlist'
]
const titles = {
  'user': 'User',
  'event': 'Event',
  'result': 'Result',
  'wishlist': 'Wish List'
}

/* Base Path */
const basePath = './client/'

let entries = {}
let htmlWebpackPlugins = []
htmlWebpackPlugins.push(new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  'window.jquery': 'jquery',
  Popper: ['popper.js', 'default'],
  Util: 'exports-loader?Util!bootstrap/js/dist/util',
  Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown'
}))
htmlWebpackPlugins.push(new HtmlWebpackPlugin({
  inject: false
}))

clientPages.forEach((page) => {
    /* Create entries */
  entries[page] = [`${basePath}${page}.js`]
    /** This will create the page
     * `filename` is the generated file
     * `inject` is the DOM in the template where the content will be injected
     * `template` is the template for the generated file, can be .ejs, .html, .hbs, etc.
     **/
  htmlWebpackPlugins.push(
    new HtmlWebpackPlugin({
      title: titles[page],
      inject: false,
      bundle: `${page}.bundle.js`,
      filename: `${page}/index.html`,
      template: `${basePath}index.html`
    })
  )
})

module.exports = [{
  entry: entries,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
        secure: false
      }
    }
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
            { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['es2015', 'react'] } },
            { test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
            { test: /\.css$/, loaders: 'style-loader!css-loader'},
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
      { test: /\.(scss)$/,
        use: [{
          loader: 'style-loader' // inject CSS to page
        }, {
          loader: 'css-loader' // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                require('autoprefixer')
              ]
            }
          }
        }, {
          loader: 'sass-loader' // compiles SASS to CSS
        }]
      }
    ]
  },
  plugins: htmlWebpackPlugins
}]
