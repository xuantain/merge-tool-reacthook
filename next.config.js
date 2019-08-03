const dev = process.env.NODE_ENV !== 'production';
const path = require('path');

let config = {};

if (dev) {
  const withTypescript = require('@zeit/next-typescript');
  const withImages = require('next-images');
  const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

  config = withImages(
    withTypescript({
      webpack(config, options) {
        // Do not run type checking twice:
        if (options.isServer) {
          config.plugins.push(
            new ForkTsCheckerWebpackPlugin({
              tsconfig: path.resolve(__dirname, 'tsconfig.json')
            })
          );
        }

        return config;
      }
    })
  );
}

module.exports = config;
