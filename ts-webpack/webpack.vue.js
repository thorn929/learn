const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: {
    index: "./src/main.ts",
  },
  mode: "development",
  module: {
    rules: [
      {
        // ？可有可无
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.[name].js",
    // resolve 绝对路径 dirname 当前所在文件目录
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    // contentBase: path.resolve(__dirname, "dist"),
    port: 3020,
    static: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "template.html"),
    }),
    new VueLoaderPlugin(),
  ],
};
