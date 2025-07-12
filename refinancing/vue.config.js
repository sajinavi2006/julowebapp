const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
  publicPath: '/refinancing',
  lintOnSave: true,
  runtimeCompiler: true,
   configureWebpack: {
     mode: 'none',
       /*plugins: [
                new BundleAnalyzerPlugin({ analyzerMode: 'server', analyzerHost: '0.0.0.0'})

              ],*/
     optimization: {
       minimize: true,
       minimizer: [
         // we specify a custom UglifyJsPlugin here to get source maps in production
         new TerserPlugin({
             cache: './img/',
             parallel: true,
             terserOptions: {
               compress: {},
               ecma: 6,
               mangle: true
             },
             sourceMap: true
           })
         ]
      }
    }
};
