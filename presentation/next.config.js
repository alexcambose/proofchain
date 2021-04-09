// next.config.js
const withImages = require('next-images');
module.exports = withImages({
  fileExtensions: ['jpg', 'jpeg', 'png', 'gif'],

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
          },
        },
      ],
    });

    return config;
  },
});
