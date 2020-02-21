const paths = require("./paths");
const commonModules = require("./common-module-loaders");
const webpack = require("webpack");
const vendorDir = `${paths.src}/vendor/`;

module.exports = {
  /**
   * Context
   *
   * Context of requests in the manifest file
   */
  context: __dirname,
  entry: {
    /**
     * Libraries
     *
     * The less changed files that don't need rebuilding.
     */
    library: [
      `${vendorDir}fontawesome-free/css/all.min.css`,
      `${vendorDir}slick/slick.css`,
      `${vendorDir}magnific-popup/dist/magnific-popup.css`,
      `${vendorDir}modernizr/modernizr.min`,
      `${vendorDir}jquery/dist/jquery.min`,
      `${vendorDir}popper.js/dist/esm/popper.min`,
      `${vendorDir}bootstrap/dist/js/bootstrap.min`,
      `${vendorDir}theia-sticky-sidebar/dist/resizesensor.min`,
      `${vendorDir}theia-sticky-sidebar/dist/theia-sticky-sidebar.min`,
      `${vendorDir}slick/slick.min`,
      `${vendorDir}magnific-popup/dist/jquery.magnific-popup.min`
    ]
  },
  /**
   * Libraries
   *
   * Where the bundled files will be outputted.
   */
  output: {
    path: `${paths.build}/js`,
    filename: "[name].dll.js",
    library: "[name]"
  },

  /**
   * Resolve
   *
   * Resolves 'jQuery and Popper.js module not found' error on webpack.
   */
  resolve: {
    modules: [paths.src, paths.nodeModules],
    alias: {
      jquery: `${vendorDir}jquery/dist/jquery.min`,
      jQuery: `${vendorDir}jquery/dist/jquery.min`,
      "popper.js": `${vendorDir}popper.js/dist/esm/popper.min`
    }
  },
  plugins: [
    /**
     * DLL Plugin
     *
     * Optimizes speed for webpack by not rebuilding less changed libraries(files)
     *
     * Creates a 'manifest' for the webapck.dev to connect too
     */
    new webpack.DllPlugin({
      name: "[name]",
      path: `${paths.build}/js/library-manifest.json`
    })
  ],

  /**
   * Module
   *
   * Determine how modules within the project are treated.
   */
  module: commonModules
};
