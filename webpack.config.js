'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var chalk = require('chalk');

var ENV = process.env.NODE_ENV;
var IS_PRODUCTION = ENV === 'production';
var VERSION = JSON.stringify(require('./package.json').version);

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

let webpackConfig = {

  context: root(),

  debug: !IS_PRODUCTION,

  devtool: IS_PRODUCTION ?
    'hidden-source-map' :
    'source-map',

  entry: {
    app: './src/bootstrap.ts',
    vendor: './src/vendor.ts',
    polyfills: './src/polyfills.ts'
  },

  output: {
    path: root('dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  devServer: {
    outputPath: root('dist'),
    watchOptions: {
      poll: true
    },
    historyApiFallback: true,
    port: 9999,
    stats: {
      modules: false,
      cached: false,
      chunk: false
    }
  },

  resolve: {
    extensions: ['', '.js', '.ts', '.html'],
    descriptionFiles: ['package.json'],
    root: root('src'),
    modules: [
      root('src'),
      'node_modules'
    ]
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel?cacheDirectory',
        exclude: /(node_modules)/
      },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        exclude: /(node_modules)/
      }
    ]
  },

  plugins: [

    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'polyfills'],
      minChunks: Infinity
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'dependency',
      title: 'Demo'
    }),

    new CleanWebpackPlugin(['dist'], {
      root: root(),
      verbose: false,
      dry: false
    }),

    new webpack.DefinePlugin({
      'ENV': JSON.stringify(ENV),
      'IS_PRODUCTION': IS_PRODUCTION,
      'VERSION': VERSION
    }),

    // https://github.com/angular/angular/issues/11580#issuecomment-246880731
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      root('src') // location of your src
    ),

    new WebpackNotifierPlugin({
      alwaysNotify: true
    }),

    new ProgressBarPlugin({
      format: chalk.yellow.bold('Webpack Building...') + ' [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
    })
  ]
};

if(IS_PRODUCTION) {

  webpackConfig.plugins.push(new webpack.optimize.DedupePlugin());

  webpackConfig.plugins.push(new webpack.NoErrorsPlugin());

  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    // beautify: true, //debug
    // mangle: false, //debug
    // dead_code: false, //debug
    // unused: false, //debug
    // deadCode: false, //debug
    // compress: {
    //   screw_ie8: true,
    //   keep_fnames: true,
    //   drop_debugger: false,
    //   dead_code: false,
    //   unused: false
    // }, // debug
    // comments: true, //debug
    beautify: false, //prod
    mangle: false, //prod
    //mangle: { screw_ie8 : true }, //prod
    compress: { screw_ie8: true }, //prod
    comments: false //prod
  }));
}

module.exports = webpackConfig;
