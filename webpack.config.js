var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  devtool: 'source-map',
  entry: [
    './index.jsx'
  ],
  output: {
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      include: path.resolve(__dirname, 'src'),
      options: {
        presets: [
          ['env', {
            'targets': {
              'browsers': ['last 2 versions', 'safari >= 7']
            }
          }],
          'react'
        ],
        plugins: [
          'transform-class-properties',
          'transform-object-rest-spread',
        ],
      }
    }]
  }
};
