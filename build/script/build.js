import rm from 'rimraf';
import path from 'path';
import chalk from 'chalk';
import webpack from 'webpack';
import webpackConfig from '../../webpack.config';

rm(path.join('dist'), err => {
  if (err) throw err;
  webpack(webpackConfig, function (err, stats) {
    if (err) throw err;
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    }) + '\n\n');

    console.log(chalk.cyan('  Build complete.\n'));
    console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
    ));
  });
});