const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async (config, {configType}) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@clubwoof-components': path.resolve(__dirname, '../src/components'),
      '@clubwoof-styles': path.resolve(__dirname, '../src/styles'),
      '@clubwoof-hooks': path.resolve(__dirname, '../src/hooks'),
      '@clubwoof-context': path.resolve(__dirname, '../src/context'),
      '@clubwoof-constants': path.resolve(__dirname, '../src/constants'),
      '@clubwoof-test-utils': path.resolve(__dirname, '../src/test-utils'),
    }

    return config
  },
}