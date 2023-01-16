// @ts-ignore
const path = require('path')

module.exports = {
  stories: ['../frontend/**/*.stories.mdx', '../frontend/**/*.stories.@(js|jsx|ts|tsx)'],
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
      '@clubwoof-components': path.resolve(__dirname, '../frontend/components'),
      '@clubwoof-styles': path.resolve(__dirname, '../frontend/styles'),
      '@clubwoof-hooks': path.resolve(__dirname, '../frontend/hooks'),
      '@clubwoof-context': path.resolve(__dirname, '../frontend/context'),
      '@clubwoof-constants': path.resolve(__dirname, '../frontend/constants'),
      '@clubwoof-test-utils': path.resolve(__dirname, '../frontend/test-utils'),
      '@clubwoof-i18n': path.resolve(__dirname, '../i18n/locales'),
      '@clubwoof-utils': path.resolve(__dirname, '../frontend/utils'),
    }

    return config
  },
}
