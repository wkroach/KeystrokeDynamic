var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var config = require('./webpack.base.config.js');
var ip = 'localhost';
config.devtool = "#eval-source-map";

config.entry = {
  App2: [
    'webpack-dev-server/client?http://' + ip + ':3000',
    'webpack/hot/only-dev-server',
    './src/App2',
  ],
}

config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BundleTracker({filename: './webpack-stats-local.json'}),
]);

config.output.publicPath = 'http://' + ip + ':3000' + '/assets/bundles/'

config.module.loaders.push(
  { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot','babel-loader'] }
);

module.exports = config;