const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  webpackFinal: async (config) => {
    config.resolve.plugins = config.resolve.plugins || []
    config.module.rules = config.module.rules || []
    config.resolve.plugins.push(new TsconfigPathsPlugin())
    config.module.rules.push({
      test: /\.stories\.tsx/,
      use: [{ loader: 'story-description-loader', options: { isTSX: true } }],
    })
    return config
  },
  stories: ['../src/**/*.stories.@(ts|tsx|mdx)'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
      },
    },
    'storybook-dark-mode',
  ],
  typescript: {
    check: false,
  },
}
