// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const distFolder = 'build';
const src = 'src';

// development webpack configuration.
module.exports = {
  entry: { main: './src/index.tsx' },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
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
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ['node_modules']
  },
  output: {
    path: path.resolve(__dirname, distFolder),
    sourceMapFilename: 'bundle.js.map',
    publicPath: '',
    filename: '[name]-[hash].js',
    chunkFilename: '[id]-[chunkhash].js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Leo Vegas Test App',
      template: './public/index.html',
      favicon: './public/favicon.ico'
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, distFolder),
    compress: true,
    host: 'leo-vegas-test.com',
    port: 9090,
    writeToDisk: true,
    disableHostCheck: true // That solved it
  },
  mode: devMode ? 'development' : 'production',
  devtool: devMode ? 'source-map' : false
};
