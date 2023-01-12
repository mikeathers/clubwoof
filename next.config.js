/** @type {import('next').NextConfig} */

const {i18n} = require('./next-i18next.config.js')

require('dotenv').config()
const webpack = require('webpack')

const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  i18n,
  // webpack: (config) => {
  //   config.plugins.push(new webpack.EnvironmentPlugin(process.env))
  //   return config
  // },
}

module.exports = nextConfig
