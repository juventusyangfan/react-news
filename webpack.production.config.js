var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html

var plugins = [
        new webpack.optimize.UglifyJsPlugin({
          output: {
            comments: false
          },
          compress: {
            warnings: false,
            // 去掉debugger和console
            drop_debugger: true,
            drop_console: true
          }
        }),
        new webpack.optimize.DedupePlugin(),

        new webpack.DefinePlugin({
         'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
        }),
        new ExtractTextPlugin('[name]-[hash].css', {allChunks: true}), //css单独打包

        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            filename: '../index.html', //生成的html存放路径，相对于 outpath
            template: './build/template/index.html', //html模板路径
            hash: true  //为静态资源生成hash值
        }),
        new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor'],
        minChunks: Infinity
        }),

    ];

var outpath = './build/production/assets/';

module.exports = {
    entry: {
        app: './src/app.js',
        vendor: ['react', 'react-dom','material-ui'/*等等其他的模块*/]
    },
    output: {
        path: outpath,
        publicPath: 'assets/',
        filename: '[name]-[hash].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.scss$/,
                exclude: path.resolve(__dirname, 'src/styles'),
                loader: 'style!css?modules!postcss!sass'
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, 'src/styles'),
                loader: ExtractTextPlugin.extract("style-loader","css-loader")
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url?limit=50000&name=[path][name].[ext]'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: plugins,
    postcss: [autoprefixer]
};
