const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.config')

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',  // dev
  // devtool: 'cheap-module-source-map',   // pro
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
    // publicPath: '//cdn.com'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './dist',
    // open: true,
    hot: true,  // 开启HMR
    hotOnly: true,  // HMR不生效，浏览器不自动刷新
    historyApiFallback: true   // 解决单页面路由
  },
}

module.exports = merge(commonConfig, devConfig)
