const path = require("path");
const webpack = require("webpack");
import HtmlWebpackPlugin from 'html-webpack-plugin';

const webpackConfig = {
  entry: {
    main: "./src/root.js",
    // common: ["./vendor"] // optional
  },
  resolve: {
    extensions: [" ", '.js', '.jsx', '.css', '.less'],
    modules: ['node_modules', 'src'],
    alias: {
      '@node_modules': path.resolve('node_modules'),
    },
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].chunkhash.js",
    chunkFilename: "[chunkhash].js"  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader?cacheDirectory'],
      },
      {
        test: /\.css|less$/,
        exclude: [path.resolve('node_modules')],
        use: [
          {
            loader: "style-loader?sourceMap=true"
          },
          {
            loader: "css-loader?sourceMap=true"
          },
          {
            loader: "less-loader?sourceMap=true",
          }
        ],
      },
    ]

  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: 'body',
    }),
  ]
};



export default webpackConfig;