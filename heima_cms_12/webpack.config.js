const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 入口
  entry: path.join(__dirname, './src/js/main.js'),
  // 出口
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  // 配置devServe开发环境
  devServer: {
    contentBase: path.join(__dirname, './src'),
    open: true,
    port: 3000
  },

  // 有利于开发期间定位错误信息
  devtool: '#eval-source-map',

  // 配置loader，处理不同的静态资源
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(sass|scss)$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      {
        test: /\.(png|jpg|jpeg|gif|bmp|webp)$/, use: {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      },
      { test: /\.(ttf|woff|woff2|svg|eot)$/, use: 'file-loader' },
      { test: /\.vue$/, use: 'vue-loader' },
    ]
  },

  // 配置 htmlWebpackPlugin
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html'
    })
  ]
}