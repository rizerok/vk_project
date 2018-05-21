const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');

let extractSASS = new ExtractTextPlugin({
    filename:path.join('public','[chunkhash].css')
});

module.exports = {
    output:{
        filename:path.join('public','[chunkhash].js'),
        publicPath:'/',
    },
    module:{
        rules:[
            {
                test: /\.scss$/,
                exclude:path.resolve('assets','styles'),
                use: extractSASS.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            minimize:true,
                            modules: true,
                            localIdentName: '[path][name]-[local]-[hash:base64:3]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options:{
                            sourceMap: true
                        }
                    },
                    {
                        loader:'sass-loader',
                        options:{

                        }
                    }]
                })
            },
            {
                test: /\.scss$/,
                include:path.resolve('assets','styles'),
                use: extractSASS.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            minimize:true,
                            modules: true,
                            localIdentName: '[hash:base64:8]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options:{
                            sourceMap: true
                        }
                    },
                    {
                        loader:'sass-loader',
                        options:{

                        }
                    }]
                })
            }
        ]
    },
    devtool:'cheap-module-source-map',
    plugins:[
        new WebpackChunkHash({algorithm: 'md5'}),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            uglifyOptions:{
                compress: {
                    drop_console: true
                },
                warnings:false,
                output:{
                    comments: false
                }
            }
        }),
        extractSASS,
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendors",
            filename:path.join('public','[chunkhash].js'),
            minChunks: Infinity,
        }),
        new ManifestPlugin({
            map:({name,path,chunk})=>({
                path:`/${chunk.renderedHash}${path.match(/\..*/)[0]}`,
                name
            })
        })
    ]
};