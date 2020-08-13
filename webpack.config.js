// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const distFolder = '.dist';
const src = 'src';

// development webpack configuration.
module.exports = {
  entry: { main: './src/index.jsx' },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMode
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: {
                localIdentName: '[local]__[hash:base64:8]'
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: () => [
                postcssPresetEnv({ stage: 4, autoprefixer: { grid: true } })
              ]
            }
          },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@nrei/components': path.resolve(__dirname, src, 'components/'),
      '@nrei/styles': path.resolve(__dirname, src, 'styles/')
    },
    extensions: ['.js', '.jsx'],
    modules: ['node_modules']
  },
  output: {
    path: path.resolve(__dirname, distFolder),
    publicPath: '/',
    filename: '[name]-[hash].js',
    chunkFilename: '[id]-[chunkhash].js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Leo Vegas Test App',
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, distFolder),
    compress: true,
    host: '0.0.0.0',
    port: 9090,
    writeToDisk: true
  },
  mode: devMode ? 'development' : 'production',
  devtool: devMode ? 'source-map' : false
};
