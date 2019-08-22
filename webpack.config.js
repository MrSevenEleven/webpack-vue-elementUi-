const path = require("path");
const htmlwebpackplugin = require("html-webpack-plugin");
const extracttextplugin = require("extract-text-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const {VueLoaderPlugin} = require("vue-loader");

const cssextract=new extracttextplugin({
    filename:"font/[name].iconfont.css"});
const scssextract=new extracttextplugin({
    filename:"css/[name].css"});

// new extracttextplugin("css/[name].[hash:8].css"),

module.exports = {
    // entry:"./src/main.js",
    // 	output:{
    // 	path:__dirname+"/dist",
    // 	filename:"[hash].boudle.js"
    // },
    entry: {
        // pageA:["@babel/polyfill", "./src/js/main.js"],
        pageA: "./src/js/main.js",
        pageB: "./src/js/index.js"
    },
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new htmlwebpackplugin({
            template: "src/index.html",
            filename: "pageA.html",
            chunks: ["pageA"],
            title: "pageA",
            hash: true,
        }),
        new htmlwebpackplugin({
            template: "src/index.html",
            filename: "pageB.html",
            chunks: ["pageB"],
            title: "pageB",
            hash: true,
            minify: {
                removeAttributeQuotes: true
            }
        }),
        // new extracttextplugin("css/[name].[hash:8].css"),
        cssextract,
        scssextract,
        new CleanWebpackPlugin(),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                // use:["style-loader","css-loader","sass-loader"],
                use: scssextract.extract({
                    use: ["css-loader", 'postcss-loader', "sass-loader"],
                    // fallback: "style-loader",
                    // publicPath: "../"
                }),
                exclude: /node_modules/
            }, {
                test: /\.(jpe?g|png|gif)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 8192,
                        name: "img/[name].[ext]"
                    }
                }],
            }, {
                test: /\.(htm|html)$/,
                use: "html-withimg-loader"
            }, {
                test: /\.js$/,
                include: /src/,
                exclude: /node_modules/,
                use: "babel-loader"
            }, {
                test: /\.vue$/,
                use: "vue-loader",
                exclude: /node_modules/,
            },  {
                test: /\.css$/,
                // use:['style-loader','css-loader'],
                use:cssextract.extract({
                    use: ["css-loader",'postcss-loader'],
                    fallback: "style-loader",
                    publicPath: "../"
                }),
            },{
                test: /\.(ttf|eot|woff|woff2|svg)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 8192,
                        name: "font/[name].[ext]"
                    }
                }],
            }
        ],
    },
    devtool: "source-map",
    devServer: {
        contentBase: "dist",
        port: "8080",
        inline: true,
        openPage: "pageA.html"
    },
    mode: "development"

}