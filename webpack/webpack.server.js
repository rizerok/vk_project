const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    target:'node',
    entry:{
        server:path.resolve('src','server.js')
    },
    output:{
        filename:path.join('server','[name].js'),
        publicPath:'/'
    },
    resolve:{
        alias:{
            root:path.resolve(),
            public:path.resolve('public'),
            src:path.resolve('src'),
            components:path.resolve('src','components'),
            utils:path.resolve('src','utils'),
            styles:path.resolve('src','assets','styles'),
            fonts:path.resolve('src','assets','fonts'),
            img:path.resolve('src','assets','images'),
            functions:path.resolve('src','functions'),
            constants:path.resolve('src', 'constants'),
            middleware: path.resolve('src', 'middleware'),
            templates: path.resolve('src', 'templates')
        }
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
                        localIdentName: '[path][name]-[local]-[hash:base64:3]'
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