var webpack = require('webpack');
var path = require('path');

var isProduction = process.argv.indexOf('-p') >= 0;
var sourcePath = path.join(__dirname, './src');
var outPath = path.join(__dirname, './dist');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var StyleLintPlugin = require('stylelint-webpack-plugin');

const pkg = require('./package.json');

var webpackConfig;

webpackConfig = {
  context: sourcePath,
  output: {
    path: outPath,
    filename: `[name][hash].js`,
    publicPath: '/',
    libraryTarget: 'umd'
  },
  entry: {
    index: './root.js',
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx'],
    mainFields: ['module', 'browser', 'main'],
    alias: {}
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.js|jsx$/,
        exclude: [/\node_modules$/, /\.json$/],
        enforce: "pre",
        loader: "eslint-loader"
      },
      { test: /\.html$/, use: 'html-loader' },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
        loader: 'url-loader?limit=200000',
        options: {
          name: '[path][name].[ext]',
          publicPath: './',
          outputPath: './assets/img/',
        }
      },
    ]
  },
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: -10
        }
      }
    },
    runtimeChunk: false
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({ options: {} }),
    new HtmlWebpackPlugin({
      template: '../public/index.html',
    }),
    new WebpackCleanupPlugin(),
    new ExtractTextPlugin({
      filename: 'styles.css',
    }),
    new StyleLintPlugin({
          context: "src",
          configFile: '.stylelintrc.js',
          files: '**/*.less',
          failOnError: false,
          quiet: false,
          syntax: 'less'
        }
    ),
  ],
  devtool: 'cheap-module-eval-source-map',
  node: {
    fs: 'empty',
    net: 'empty'
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
      umd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
      umd: 'react-dom',
    },
  },
};

module.exports = webpackConfig;