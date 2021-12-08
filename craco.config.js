const path = require('path');

module.exports = {
  style: {
    modules: {
      localIdentName: "[path]___[name]__[local]___[hash:base64:5]",
    },
  },
  webpack: {
    alias: {
      "@": path.join(path.resolve(__dirname, 'src/')),
    },
  },
}