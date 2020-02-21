const paths = require("./paths");
const commonModules = require("./common-module-loaders");
const fs = require("fs");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
/**
 *  Generates multiple HTML files using HtmlWebpackPlugin
 *
 */
const multipleHtmlsWebpackPlugin = function() {
  let htmlsDir = `${paths.src}/html`,
    dirents = fs.readdirSync(htmlsDir, {
      withFileTypes: true
    });

  let templateFiles = dirents.filter(dirent => !dirent.isDirectory());

  let templateFilesGenerateHtmls = templateFiles.map(templateFile => {
    let parts = templateFile.name.split(".");
    let name = parts[0];
    let extension = parts[1];

    return new HtmlWebpackPlugin({
      template: `${htmlsDir}/${name}.${extension}`,
      filename: `${name}.html`,
      title: "Frontendry Webpack Boilerplate"
    });
  });

  return templateFilesGenerateHtmls;
};

module.exports = {
  /**
   * Entry
   *
   * The first place Webpack looks to start building the bundle.
   */
  entry: [`${paths.src}/js/app.js`],

  /**
   * Output
   *
   * Where Webpack outputs the assets and bundles.
   */
  output: {
    path: paths.build,
    filename: "[name].bundle.js",
    publicPath: "/"
  },
  /**
   * Resolve
   *
   * Resolves 'jQuery and Popper.js module not found' error on webpack.
   */
  resolve: {
    modules: [paths.src, paths.nodeModules],
    alias: {
      jquery: `${paths.src}/vendor/jquery/dist/jquery.min`,
      jQuery: `${paths.src}/vendor/jquery/dist/jquery.min`,
      "popper.js": `${paths.src}/vendor/popper.js/dist/esm/popper.min`
    }
  },
  /**
   * Plugins
   *
   * Customize the Webpack build process.
   */
  plugins: [
    /**
     * CleanWebpackPlugin
     *
     * Removes/cleans build folders and unused assets when rebuilding.
     */
    // new CleanWebpackPlugin(),
    /**
     * CopyWebpackPlugin
     *
     * Copies files from target to destination folder.
     */
    /* new CopyWebpackPlugin([
      {
        from: paths.static,
        to: "assets",
        ignore: ["*.DS_Store"]
      }
    ]), */
  ].concat(multipleHtmlsWebpackPlugin()), // Concat the multiple HTML generator function

  /**
   * Module
   *
   * Determine how modules within the project are treated.
   */
  module: commonModules
};
