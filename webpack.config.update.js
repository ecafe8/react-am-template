const ExtractTextPlugin = require('extract-text-webpack-plugin'); // eslint-disable-line
const webpack = require('webpack'); // eslint-disable-line
const IS_DEV = process.env.NODE_ENV !== 'production';
const path = require('path'); // eslint-disable-line
const srcPath = path.resolve('./src');

const theme = require(path.resolve(srcPath, 'common/less/theme.js')); // eslint-disable-line

module.exports = (config) => {  // eslint-disable-line
  const { module, resolve } = config;

  const updatedConfig = {
    ...config,
    module: {
      ...module,
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        }, {
          test: /\.css/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader'],
          }),
        },
        {
          test: /\.mp3$/,
          exclude: /node_modules/,
          loader: 'file-loader',
          query: {
            // CSS图片目录
            name: IS_DEV ? '[path][name].[ext]' : 'assets/mp3/[hash].[ext]',
          }
        },
        {
          test: /\.mp4/,
          exclude: /node_modules/,
          loader: 'file-loader',
          query: {
            // CSS图片目录
            name: IS_DEV ? '[path][name].[ext]' : 'assets/video/[hash].[ext]',
          }
        }, {
          test: /\.(png|jpg|gif)$/,
          loader: 'url-loader',
          query: {
            limit: 10000,
            // CSS图片目录
            name: IS_DEV ? '[path][name].[ext]' : 'assets/[name].[ext]',
          }
        }, {
          test: /\.svg$/,
          exclude: /node_modules/,
          loader: 'svg-sprite-loader',
          options: {}
        }, {
          test: /\.less$/,
          exclude: [/node_modules/, srcPath + '/common/less'],
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  localIdentName: (IS_DEV ? '[local]_' : '[sx]') + '[hash:base64:6]',
                  modules: true,
                  camelCase: true,
                  sourceMap: IS_DEV
                }
              },
/*              {
                loader: 'px2rem-loader',
                options: {
                  remUnit: 75,
                  remPrecision: 8,
                }
              },*/
              {
                loader: 'postcss-loader',
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: IS_DEV,
                  modifyVars: theme
                }
              }],
          }),
        }, {
          test: /\.less$/,
          include: [/node_modules/, srcPath + '/common/less'],
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader',
              {
                loader: 'less-loader',
                options: {
                  modifyVars: theme
                }
              }],
          }),
        },
      ]
    },
    resolve: {
      ...resolve,
      alias: {
        components: srcPath + '/components',
        common: srcPath + '/common',
        assets: srcPath + '/assets',
        api: srcPath + '/api',
      }
    }
  };
  updatedConfig.plugins.push(
    new ExtractTextPlugin({filename: '[name].min.css', allChunks: true})
  );

  return updatedConfig;
};
