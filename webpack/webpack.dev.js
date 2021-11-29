/*!
 * @author claude
 * date 11/11/2021
 * webpack dev 配置
 */

const webpack = require('webpack');
const { merge } = require('webpack-merge');
const webpackConfig = require('./webpack.common.js');
const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
  }),
  new webpack.HotModuleReplacementPlugin(),
];

const devServer = {
  mode:      'development',
  devtool:   '#source-map',
  devServer: {
    compress:           true,
    historyApiFallback: true,
    host:               '127.0.0.1',
    port:               4400,
    hot:                true,
    open:               false,
    progress:           false,
    quiet:              true,
    overlay:            {
      warning: true,
      errors:  true,
    },
    proxy: {},
  },
  watchOptions: {
    ignored: [
      'node_modules',
    ],
  },
  plugins,
};

module.exports = merge(webpackConfig, devServer);
