/*!
 * @author claude
 * date 11/11/2021
 * webpack 生产配置
 */

import ora from 'ora';
import chalk from 'chalk';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import TerserJSPlugin from 'terser-webpack-plugin';
import webpackConfig from './webpack.common.js';

const loading = ora('构建编译中...');
const webpackProdConfig = merge(webpackConfig, {
  mode:    'production',
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!**/lib/**', '!**/library/**'],
    }),
  ],
  optimization: {
    minimizer: [
      new TerserJSPlugin({
        terserOptions: {
          warnings: false,
          output:   {
            comments: false,
          },
          compress: {
            drop_console:  true,
            drop_debugger: true,
          },
        },
        // sourceMap: false,
        parallel:  true,
      }),
    ],
  },
});

loading.start();

// 编译开始
webpack(webpackProdConfig, (err, stats) => {
    // 停止 loading
    loading.stop();

    if (err) throw err;

    console.log(stats.toString({
        chunks:       false,  // 使构建过程静默无输出
        colors:       true,   // 在控制台展示颜色
        modules:      false,
        children:     false,
        chunkModules: false,
        warnings:     false,
    }));

    if (stats.hasErrors()) {
        console.log(chalk.red('\n编译失败 😭 😭 😭 (Build Failure).\n'));
        process.exit(1);
    }

    console.log(chalk.cyan('\n编译成功 😉 😉 😉 (Build Success)！！！.'));
});
