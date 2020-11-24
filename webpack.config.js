'use strict';
const path=require('path');
const webpack=require('webpack');
const TerserPlugin = require("terser-webpack-plugin"); //压缩js
const {CleanWebpackPlugin }=require('clean-webpack-plugin')  //每次打包之前先清除dist文件
module.exports={
  entry:'./src/index.js', //入口文件
  output:{               //出口文件
    filename:'[name][chunkhash:8].js', //chunkhash文件指纹
    path:path.join(__dirname,'dist'),
  },
  mode:'development',// 开发模式
  module:{
       rules:[{
         test:/\.js$/,
         use:'babel-loader',  //解析es6语法
       }]
  },
  plugins:[
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "common",
    //   minChunks: Infinity,
    // }),
  ],
  devServer: {  //热更新
    hot: true,
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  optimization: {
    minimize: true,
    minimizer: [
        new TerserPlugin({ //webpack4 设置成production默认使用此压缩插件；基于uglify改造，比uglify（3.0版本以上支持es6）支持es6语法
            include: /\.min\.js$/,
        })
    ]
}
}