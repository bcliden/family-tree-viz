module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + "/docs",
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: "./docs"
  }
};
