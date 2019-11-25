const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyRightWebpackCompiler = require('./plugins/copyright')
const webpack = require('webpack')

module.exports = {
  // performance: false,   // 打包不进行警告
  entry: {
    main: './src/index.js',
    react: './src/react/index.js'
  },
  externals: {
    jquery: '$'   // key 包名  value  项目中引用的变量名
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '//cdn.com'
  },
  resolve: {
    extensions: ['.js', '.jsx'],      // 有性能损耗，尽量少写
    // mainFiles: ['index'],            // 只写目录时首先查找index文件
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // loader目录
  resolveLoader: {
    modules: ['node_modules', './loaders']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'replaceLoader',
            options: {
              name: 'lee'
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          }
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'images',
            limit: 2048,
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CopyRightWebpackCompiler({
      name: 'dell'
    }),
    // new webpack.ProvidePlugin({
    //   '$': 'jquery'    // 用到$的时候自动引入
    // })
  ],
  optimization: {
    // runtimeChunk: {
    //   name: 'runtime'    // manifest 兼容老版本
    // },
    usedExports: true,   // tree shaking
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        styles: {
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
          name: 'style'
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          // filename: 'vendors.js'
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        }
      }
    }
  }
}
