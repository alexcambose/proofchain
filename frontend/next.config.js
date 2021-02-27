module.exports = {
  webpack: function (config) {
    config.externals = config.externals || {};
    config.externals['styletron-server'] = 'styletron-server';
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
            replaceAttrValues: { '#000': '{props.color}' },
          },
        },
      ],
    });
    return config;
  },
};
