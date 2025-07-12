module.exports = {
  babel: {
    presets: [
      [
        '@babel/preset-react',
        { runtime: 'automatic', importSource: '@emotion/react' },
      ],
    ],
    plugins: ['@emotion/babel-plugin'],
  },
  webpack: {
    configure: {
      module: {
        rules: [
          {
            test: /\.(png|jpe?g|gif)$/i,
            dependency: { not: ['url'] },
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: false,
                },
              },
            ],
            type: 'javascript/auto',
          },
        ],
      },
    },
  },
};
