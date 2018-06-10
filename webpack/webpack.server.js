const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const alias = require('./alias');

module.exports = {
    target:'node',
    entry:{
        server:path.resolve('src','server.js')
    },
    output:{
        filename:path.join('server','[name].js'),
        publicPath:'/'
    },
    resolve: {
        alias,
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                include:path.resolve('src'),
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:[
                            'react'
                        ],
                        plugins: [
                            'transform-class-properties',
                            'transform-object-rest-spread'
                        ],
                        cacheDirectory:true
                    }
                }
            },
            {
                test:/\.scss$/,
                exclude:path.resolve('src','assets','styles'),
                use:[{
                    loader: 'isomorphic-style-loader',
                },
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap:true,
                        modules: true,
                        importModules:2,
                        //https://github.com/webpack/loader-utils#interpolatename
                        localIdentName: '[path][name]-[local]'
                    }
                },
                {
                    loader:'postcss-loader',
                    options:{
                        sourceMap: true
                    }
                },
                {
                    loader:'sass-loader',
                    options:{

                    }
                }]
            },
            {
                test: /\.(gif|png|jpe?g|ico)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '/public/images/[name].[ext]',
                        publicPath: function (url) {
                            return url.replace(/\/public/, '');
                        }
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                loader: 'svg-react-loader',
                query: {

                    xmlnsTest: /^xmlns.*$/
                }
            },
            {
                test: /fonts\/.*\.(eot|ttf|woff|woff2)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: path.join('public', 'fonts', '[name].[ext]'),
                        publicPath: function (url) {
                            return url.replace(/public/, '');
                        }
                    }
                }
            }
        ]
    },
    externals:[nodeExternals()],
    plugins:[
        new CleanWebpackPlugin(
            [
                'server'
            ],
            {
                root:     path.resolve(),
                verbose:  true
            }
        ),
    ]
};