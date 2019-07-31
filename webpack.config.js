const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode:'development',
  entry:__dirname+'/src/main.js',
  output:{
    path: __dirname+'/public',
    filename:'[name].bundle.js',
    chunkFilename:'[name].js',
    publicPath:'/'
  },
  devServer:{
    historyApiFallback: true,
    hot:true,
    inline:true,
    progress: true,
    contentBase:'./public',
    port:8080
  },
  module:{
    rules:[
      {
        test:/(\.jsx|.js)$/,
        loader:'babel-loader',
        exclude:/node_modules/
      },{
        test:/\.css$/,
        use:[
          {loader:'style-loader'},
          {
            loader:'css-loader?modules&localIdentName=[name]-[hash:base64:5]'
          }
        ]
      },{
        test:/\.(png|jpg|gif|swf)$/,
        loader:'file-loader'
      }
    ]
  },
  resolve:{
    extensions:['*','.js','.jsx','.css']
  },
  plugins:[
    new HtmlWebpackPlugin({
      filename:'index.html',
      title:'welcome',
      template:__dirname+'/index.html'
    })
  ],
  optimization:{
    minimizer:[
      new UglifyJsPlugin({
        uglifyOptions:{
          compress:false
        }
      })
    ]
  }
}