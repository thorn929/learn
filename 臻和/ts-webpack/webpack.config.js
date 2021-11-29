const path = require("path");

module.exports = {
  entry: {
    index: "./src/index.ts",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: "bundle.[name].js",
    // resolve 绝对路径 dirname 当前所在文件目录
    path: path.resolve(__dirname, "dist"),
  },
};
