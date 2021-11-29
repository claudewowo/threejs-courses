/*!
 * @author keman.wu
 * date 11/11/2021
 * 公共 webpack 配置
 */

import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __dirname = path.resolve();
const resolve = dir => path.resolve(__dirname, dir);

const isProd = process.env.npm_lifecycle_event === 'prod';
const webpackConfig = {
  mode:  'development',
  entry: {
    main: resolve('src/views/20211130/main.js'),
  },
  output: {
    filename:      `js/[name].[fullhash:7].js`,
    chunkFilename: `js/[name].[fullhash:7].js`,
    path:          resolve('./dist'),
    publicPath:    isProd ? '/dist/' : '/',
  },
  resolve: {
    extensions: ['.js', '.css'],
    alias:      {
      '@':        resolve('./'),
      '@src':     resolve('./src'),
      '@views':   resolve('./src/views'),
    },
  },
  module: {
    rules: [{
      test: /\.(sc|c)ss$/,
      use:  [
        'style-loader',
        'css-loader',
      ],
      exclude: [/node_modules/],
    }, {
      test:    /\.js$/,
      use:     ['babel-loader'],
      exclude: [/node_modules/],
    }, {
      test: /\.(png|jpe?g|svg|gif)$/i,
      use:  [{
        loader:  'url-loader',
        options: {
          limit: 8192,    // 8k
          name:  'images/[name].[hash:7].[ext]',
        },
      }],
      exclude: [],
    }, {
      test: /\.(eot|woff|woff2|ttf)$/i,
      use:  [{
        loader:  'url-loader',
        options: {
          limit: 8192,    // 8k
          name:  'fonts/[name].[hash:7].[ext]',
        },
      }],
      exclude: [],
    }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename:      'css/[name].[hash:7].css',
      chunkFilename: 'css/[id].[hash:7].css',
    }),
    new HtmlWebpackPlugin({
      template: resolve('./public/index.html'),
      // favicon:  resolve('../public/logo.png'),
      inject:   true,
    }),
  ],
  /* optimization: {
    splitChunks: {
      minChunks:          1,
      name:               true,
      chunks:             'async',
      minSize:            100 * 1024,
      maxInitialRequests: 5,
    },
  }, */
};

export default webpackConfig;
