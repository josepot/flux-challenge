const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
      index: './src/setup/index.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use:  ['style', 'css', 'sass']          
        },
        {
          test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
          loader: 'url-loader?limit=100000' 
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/setup/index.html",
        filename: "./index.html"
      })
    ]
  };