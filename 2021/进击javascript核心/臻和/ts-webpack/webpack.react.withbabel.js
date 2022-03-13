const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/ReactHello.tsx",
  },
  mode: "development",
  module: {
    rules: [
      {
        // ？可有可无
        test: /\.tsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-typescript",
              "@babel/preset-react",
              "@babel/preset-env",
            ],
          },
        },
        exclude: /node_modules/,
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
    port: 3021,
    static: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "template.html"),
    }),
  ],
};
