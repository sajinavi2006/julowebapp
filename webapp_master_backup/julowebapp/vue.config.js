const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
//const SentryPlugin = require("@sentry/webpack-plugin");
//const enums = require('./src/enums');

module.exports = {
  lintOnSave: true,
  runtimeCompiler: true,
   configureWebpack: {
     mode: 'none',
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
  // devServer: {
  // 	https: true
  // }
  ///
  // productionSourceMap: true,
  // configureWebpack: {
  // 	plugins: [
  // 		new SentryPlugin({
  // 			environment: process.env.NODE_ENV || 'dev',
  // 			//release: '1.0.0',
  // 			include: './dist',
  // 			ignore: ['node_modules', 'webpack.config.js']
  // 		})
  // 	]
  // }
};
