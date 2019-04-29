"use strict";

const webpack = require("webpack");
const path = require("path");
const os = require("os");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackBar = require("webpackbar");
const autoprefixer = require("autoprefixer");
const Dotenv = require("dotenv-webpack");

const history = require("connect-history-api-fallback");
const convert = require("koa-connect");

const paths = require("./paths");

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = "/";
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = "";

const postCssLoaderConfig = {
    loader: require.resolve("postcss-loader"),
    options: {
        ident: "postcss",
        plugins: () => [
            require("postcss-flexbugs-fixes"),
            autoprefixer({
                flexbox: "no-2009",
            }),
        ],
    },
};

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: [paths.appIndexJs],
    serve: {
        port: 3000,
        hot: true, // hmr
        add: (app, middleware, options) => {
            const historyOptions = {
                // ... see: https://github.com/bripkens/connect-history-api-fallback#options
            };

            app.use(convert(history(historyOptions)));
        },
        host: '0.0.0.0',
        dev: {
            logLevel: "silent",
        },
    },
    output: {
        filename: "static/js/[name].js",
        chunkFilename: "static/js/[name].chunk.js",
        publicPath: publicPath,
        devtoolModuleFilenameTemplate: info =>
            path.resolve(info.absoluteResourcePath).replace(/\\/g, "/"),
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            name: "vendors",
        },
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
        plugins: [new TsconfigPathsPlugin({ configFile: paths.appTsconfigJson })],
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve("url-loader"),
                        options: {
                            limit: 10000,
                            name: "static/media/[name].[hash:8].[ext]",
                        },
                    },
                    {
                        test: /\.tsx?$/,
                        use: [
                            { loader: require.resolve("cache-loader") },
                            {
                                loader: require.resolve("thread-loader"),
                                options: {
                                    // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                                    workers: os.cpus().length - 1,
                                },
                            },
                            {
                                loader: require.resolve("ts-loader"),
                                options: {
                                    happyPackMode: true,
                                    configFile: paths.appTsconfigJson,
                                },
                            },
                        ],
                    },
                    {
                        test: /\.css$/,
                        use: [
                            require.resolve("style-loader"),
                            {
                                loader: require.resolve("css-loader"),
                                options: { importLoaders: 1 },
                            },
                            postCssLoaderConfig,
                        ],
                    },
                    {
                        test: /\.(scss|sass)$/,
                        use: [
                            require.resolve("style-loader"),
                            {
                                loader: require.resolve("css-loader"),
                                options: { importLoaders: 2 },
                            },
                            postCssLoaderConfig,
                            {
                                loader: require.resolve("sass-loader"),
                            },
                        ],
                    },
                    {
                        exclude: [/\.(ts|tsx|js|jsx)$/, /\.html$/, /\.json$/],
                        loader: require.resolve("file-loader"),
                        options: {
                            name: "static/media/[name].[hash:8].[ext]",
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new WebpackBar({
            name: "development",
            color: "orange",
        }),
        new Dotenv({
            path: paths.dotenv,
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml,
        }),
        new ForkTsCheckerWebpackPlugin({
            tslint: paths.appTslintJson,
            tsconfig: paths.appTsconfigJson,
            checkSyntacticErrors: true,
        }),
        new ForkTsCheckerNotifierWebpackPlugin({ excludeWarnings: true }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
};
