const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");

const config = {
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src", "template.html")
    }),
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ["dist"]
        }
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(s[ac]ss)|(css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      }
    ]
  },
  devServer: {
    port: 8080,
    open: true,
    compress: true,
    watchFiles: path.resolve(__dirname, "src")
  }
};

module.exports = config;