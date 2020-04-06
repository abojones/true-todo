const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('path');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  plugins: [new HtmlWebpackPlugin({
    template: './public/index.html'
  })]
};