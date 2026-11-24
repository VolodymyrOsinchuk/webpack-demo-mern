const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

// Environment
const isDevelopment = process.env.NODE_ENV !== "production";

// Load environment variables
const envFile = isDevelopment ? ".env.development" : ".env.production";

dotenv.config({
  path: path.resolve(__dirname, envFile),
});

// API configuration
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

module.exports = {
  mode: isDevelopment ? "development" : "production",

  entry: {
    app: "./src/index.js",
  },

  devtool: isDevelopment ? "eval-source-map" : "source-map",

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      title: "React Webpack",
    }),

    // Environment variables
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        isDevelopment ? "development" : "production",
      ),

      "process.env.REACT_APP_API_URL": JSON.stringify(API_URL),
    }),

    // React Fast Refresh
    ...(isDevelopment ? [new ReactRefreshWebpackPlugin()] : []),
  ],

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "/",
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,

        use: {
          loader: "babel-loader",

          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],

            plugins: [
              ...(isDevelopment
                ? [require.resolve("react-refresh/babel")]
                : []),
            ],
          },
        },
      },

      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx"],

    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },

  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },

    hot: true,
    compress: true,
    historyApiFallback: true,
    port: 3000,
  },
};
