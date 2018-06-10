const path = require('path');
const alias = require('./alias');
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
        alias
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
                            'react',
                            //'stage-3'// https://babeljs.io/docs/plugins/preset-stage-3/
                        ],
                        plugins: [
                            'transform-class-properties',
                            'transform-object-rest-spread'
                        ]
                        //cacheDirectory:true
                    }
                }
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