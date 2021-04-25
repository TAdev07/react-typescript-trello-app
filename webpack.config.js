const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { HotModuleReplacementPlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "src/index.tsx"),
    output: {
        path: path.resolve(__dirname, "docs"),
        filename: "bundle.[contenthash].js",
        publicPath: "/react-typescript-trello-app/",
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
        alias: {
            Src: 'src',
            react: require.resolve('react')
        }
    },
    module: {
        rules: [
            {
                test: /\.(jsx|tsx)?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    cacheDirectory: true,
                    presets: ['@babel/preset-react']
                }
            },
            {
                test: /\.(js|ts)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            },
            {
                test: /\.(svg|md)$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            },
            {
                type: 'javascript/auto',
                test: /\.json$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './json/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        //Allows remove/clean the build folder
        new CleanWebpackPlugin(),
        //Allows update react components in real time
        new HotModuleReplacementPlugin(),
        //Allows to create an index.html in our build folder
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html"), //we put the file that we created in public folder
        }),
        //This get all our css and put in a unique file
        new MiniCssExtractPlugin({
            filename: "styles.[contentHash].css",
        }),
    ],
    //Config for webpack-dev-server module
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, "dist"),
        hot: true,
        port: 8000,
    },
};