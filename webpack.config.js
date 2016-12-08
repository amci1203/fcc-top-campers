const webpack = require('webpack'),
      path = require('path');

const BUILD_DIR = path.resolve(__dirname, './app'),
      APP_DIR = path.resolve(__dirname, './src');

var config = {
  entry: APP_DIR + '/app.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'app.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      }
    ]
  }
};

module.exports = config;
