"use strict";

const autoprefixer = require("autoprefixer");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin");
const os = require("os");
const WebpackBar = require("webpackbar");
const Dotenv = require("dotenv-webpack");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const paths = require("./paths");

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = paths.servedPath;
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
const publicUrl = publicPath.slice(0, -1);

const postCssLoader = {
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
    mode: "production",
    bail: true,
    devtool: 'eval',
    entry: [paths.appIndexJs],
    output: {
        path: paths.appBuild,
        filename: "static/js/[name].[chunkhash:8].js",
        chunkFilename: "static/js/[name].[chunkhash:8].chunk.js",
        // We inferred the "public path" (such as / or /my-project) from homepage.
        publicPath: publicPath,
        // Point sourcemap entries to original disk location (format as URL on Windows)
        devtoolModuleFilenameTemplate: info =>
            path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, "/"),
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            name: "vendors",
        },
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".jsx"],
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
                        exclude: [/[/\\\\]node_modules[/\\\\]/],
                        use: [
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
                            MiniCssExtractPlugin.loader,
                            {
                                loader: require.resolve("css-loader"),
                                options: { importLoaders: 1, sourceMap: false },
                            },
                            postCssLoader,
                        ],
                    },
                    {
                        test: /\.(scss|sass)$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: require.resolve("css-loader"),
                                options: { importLoaders: 2, sourceMap: false },
                            },
                            postCssLoader,
                            {
                                loader: require.resolve("sass-loader"),
                            },
                        ],
                    },
                    // "file" loader makes sure assets end up in the `build` folder.
                    // When you `import` an asset, you get its filename.
                    // This loader doesn't use a "test" so it will catch all modules
                    // that fall through the other loaders.
                    {
                        loader: require.resolve("file-loader"),
                        exclude: [/\.(ts|tsx|js|jsx)$/, /\.html$/, /\.json$/],
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
            name: "production",
            color: "green",
        }),
        new Dotenv({
            path: paths.dotenv,
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
        new UglifyJsPlugin({
            sourceMap: false,
        }),
        new OptimizeCSSAssetsPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "static/css/[name].[contenthash:8].css",
            chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
        }),
        new ForkTsCheckerWebpackPlugin({
            tslint: paths.appTslintJson,
            tsconfig: paths.appTsconfigJson,
            checkSyntacticErrors: true,
        }),
        new ForkTsCheckerNotifierWebpackPlugin({ excludeWarnings: true }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new FaviconsWebpackPlugin(paths.appFavIcon),
    ],
    performance: false,
};
