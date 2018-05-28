const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    target:'web',
    entry:{
        app:path.resolve('src','client.js'),
        vendors:[
            'react',
            'react-dom',
            'isomorphic-fetch',
            'react-redux',
            'react-router-config',
            'react-router-dom',
            'redux',
            'redux-thunk',
            'prop-types',
            'classnames'
        ]
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
            templates: path.resolve('src', 'templates'),
            mongo: path.resolve('src', 'mongo'),
            connectors: path.resolve('src', 'connectors')
        }
    },
    module:{
        rules:[
            {
                enforce: 'pre',
                test: /\.js$/,
                use: 'eslint-loader',
                include: [
                    path.resolve('src')
                ]
            },
            {
                test:/\.js$/,
                include:path.resolve('src'),
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:[
                            'env',//https://babeljs.io/docs/plugins/preset-env/
                            'react'
                        ],
                        plugins:[

                        ],
                        //cacheDirectory:true
                    }
                }
            },
            {
                test: /\.(gif|png|jpe?g|svg|ico)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name:path.join('public','images','[name].js')
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /fonts\/.*\.(eot|svg|ttf|woff|woff2)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name:path.join('public','fonts','[name].js')
                    }
                }
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(
            [
                'public'
            ],
            {
                root:     path.resolve(),
                verbose:  true
            }
        )
    ]
};