const path = require('path');
const common = require("./webpack.common");
const merge = require('webpack-merge');

module.exports = merge(common, {
  mode: "development",
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  devServer: {
    port: '7000'
  }
});