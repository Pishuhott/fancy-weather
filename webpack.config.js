const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const fileName = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;
const cssLoaders = extra => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {},
        }, 
        'css-loader'
    ]

    if (extra) {
        loaders.push(extra)
    }
    return loaders;
}



module.exports = {
    // context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: ['@babel/polyfill', './src/app.js'],
    output: {
        filename: fileName('js'),
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js', '.json', '.css', '.scss', '.png', '.jpg', '.gif', '.svg'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@assets': path.resolve(__dirname, 'assets'),
            '@images': path.resolve(__dirname, 'assets/images'),
            '@scripts': path.resolve(__dirname, 'src/scripts'),
            '@styles': path.resolve(__dirname, 'src/styles'),
        },
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    devServer: {
        port: 4200,
        hot: isDev
    },
    // devtool: isDev ? 'source-map' : '',
    plugins: [
        new HTMLWebpackPlugin({
            title: 'Weather',
            template: './index.html',
            minify: {
                collapseWhitespace: isProd,
            },
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src/assets'),
                to: path.resolve(__dirname, 'dist/assets'),
                noErrorOnMissing: true
            }],
        }),
        new MiniCssExtractPlugin({
            filename: fileName('css')
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(png|jpg|svg|gif|jpeg)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                    presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}