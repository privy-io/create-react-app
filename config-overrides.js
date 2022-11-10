const webpack = require("webpack");

module.exports = function override(config) {
  config.resolve.fallback = {
    assert: require.resolve("assert"),
    buffer: require.resolve("buffer"),
    "process/browser": require.resolve("process/browser"),
    stream: require.resolve("stream-browserify"),
    url: require.resolve("url"),
    http: false,
    https: false,
    os: false,
  };
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    })
  );
  config.ignoreWarnings = [/Failed to parse source map/];
  return config;
};