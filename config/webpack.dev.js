const path = require("path");
const paths = require("./paths");
const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  /**
   * Mode
   *
   * Set the mode to development or production.
   */
  mode: "development",

  /**
   * Devtool
   *
   * Control how source maps are generated.
   */
  devtool: "inline-source-map",

  /**
   * DevServer
   *
   * Spin up a server for quick development.
   */
  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    open: true,
    compress: true,
    hot: true,
    port: 8082
  },

  plugins: [
    /**
     * DLL Reference Plugin
     *
     * Optimizes speed for webpack by not rebuilding less changed libraries(files).
     *
     * References the already bundled files
     */
    new webpack.DllReferencePlugin({
      context: `${paths.build}/js`,
      manifest: `${paths.build}/js/library-manifest.json`,
      name: "[name]"
    }),

    /**
     * HotModuleReplacementPlugin
     *
     * Only update what has changed.
     */
    new webpack.HotModuleReplacementPlugin()
  ]
});
