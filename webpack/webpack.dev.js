const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

let extractSASS = new ExtractTextPlugin({
    filename:path.join('public','[name].css')
});

module.exports = {
    output:{
        filename:path.join('public','[name].js'),
        publicPath:'/',
    },
    devtool:'cheap-eval-source-map',
    module:{
        rules:[
            {
                test:/\.scss$/,
                exclude:path.resolve('src','assets','styles'),
                use:extractSASS.extract({
                    fallback: 'style-loader',
                    use:[{
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
                })
            },
            {
                test:/\.scss$/,
                include:path.resolve('src','assets','styles'),
                use:extractSASS.extract({
                    fallback: 'style-loader',
                    use:[{
                        loader: 'css-loader',
                        options: {
                            sourceMap:true,
                            importModules:2
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
                })
            }
        ]
    },
    plugins:[
        extractSASS,
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendors",
            filename:path.join('public','vendors.js'),
            minChunks: Infinity,
        }),
        new ManifestPlugin({
            map:({name,path,chunk})=>({
                path:`/${name}`,
                name
            })
        })
    ]
};