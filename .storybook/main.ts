// @ts-ignore
const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: true,
  },
  // @ts-ignore
  webpackFinal: async (config, {configType}) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@clubwoof-components': path.resolve(__dirname, '../src/components'),
      '@clubwoof-styles': path.resolve(__dirname, '../src/styles'),
      '@clubwoof-hooks': path.resolve(__dirname, '../src/hooks'),
      '@clubwoof-context': path.resolve(__dirname, '../src/context'),
      '@clubwoof-constants': path.resolve(__dirname, '../src/constants'),
      '@clubwoof-test-utils': path.resolve(__dirname, '../src/test-utils'),
      '@clubwoof-i18n': path.resolve(__dirname, '../i18n/locales'),
      '@clubwoof-utils': path.resolve(__dirname, '../src/utils'),
    }

    return config
  },
}
