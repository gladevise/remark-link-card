const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  images: {
    domains: [
      'www.google.com',
      'static.npmjs.com',
    ],
  },
};

module.exports = withPlugins([
  [withBundleAnalyzer],
], nextConfig);
