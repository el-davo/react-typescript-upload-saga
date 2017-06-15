import {DefinePlugin, HotModuleReplacementPlugin, NoEmitOnErrorsPlugin} from 'webpack';
import { CheckerPlugin } from 'awesome-typescript-loader';
import { join, resolve } from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

const port = process.env.PORT || 3000;

export const config = {

  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './demo/index.tsx'
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loaders: ['react-hot-loader', 'awesome-typescript-loader?useBabel=true&useWebpackText=true&useCache=true'],
        include: [resolve(__dirname, 'node_modules'), resolve(__dirname, 'index.ts'), resolve(__dirname, 'demo'), resolve(__dirname, 'lib')]
      }
    ]
  },

  output: {
    publicPath: `http://localhost:${port}/`,
    path: join(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'umd'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
    modules: ['app', 'node_modules', 'webpack', 'browser', 'web', 'browserify', 'main']
  },

  plugins: [
    new CheckerPlugin(),
    new HotModuleReplacementPlugin(),
    new NoEmitOnErrorsPlugin(),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new HtmlWebpackPlugin({ template: 'index.ejs' })
  ],

  externals: []
};
