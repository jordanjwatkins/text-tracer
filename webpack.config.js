var path = require('path');

module.exports = {
  entry: './js/index.js',
  output: {
    path: __dirname,
    filename: 'build/bundle.js'
  },
  devtool: "#source-map",
  module: {
    loaders: [
      { test: path.join(__dirname, 'js'), loader: 'babel-loader' }
    ]
  }
};
