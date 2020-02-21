const paths = require("./paths");
module.exports = {
  rules: [
    /**
     * JavaScript
     *
     * Use Babel to transpile JavaScript files.
     */
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: ["babel-loader", "eslint-loader"]
    },
    /**
     *
     * Expose jQuery to other scripts - Resolving 'jQuery is undefined' error on console.
     */

    {
      test: require.resolve(`${paths.src}/vendor/jquery/dist/jquery.min`),
      use: [
        {
          loader: "expose-loader",
          options: "jquery"
        },
        {
          loader: "expose-loader",
          options: "jQuery"
        },
        {
          loader: "expose-loader",
          options: "$"
        }
      ]
    },

    /**
     * Styles
     *
     * Inject CSS into the head with source maps.
     */
    {
      test: /\.(scss|css)$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: { sourceMap: true, importLoaders: 1 }
        },
        { loader: "postcss-loader", options: { sourceMap: true } },
        { loader: "sass-loader", options: { sourceMap: true } }
      ]
    },

    /**
     * Images
     *
     * Copy image files to build folder.
     */
    {
      test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
      loader: "file-loader",
      options: {
        // If you want to see where the file is coming from, add [path] before [name]
        name: "../imgs/design-assets/[name].[ext]",
        context: "src" // prevent display of src/ in filename
      }
    },

    /**
     * Fonts
     *
     * Inline font files.
     */
    {
      test: /\.(woff(2)?|eot|ttf|otf|)$/,
      loader: "url-loader",
      options: {
        limit: 8192,
        // If you want to see where the file is coming from, add [path] before [name]
        name: "[name].[ext]",
        outputPath: "../fonts/",
        context: "src" // prevent display of src/ in filename
      }
    }
  ]
};
