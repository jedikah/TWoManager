/* eslint-env node */
module.exports = {
  presets: ['@quasar/babel-preset-app'],
  plugins: [
    'graphql-tag',
    ['@babel/proposal-decorators', { legacy: true }],
    ['@babel/proposal-class-properties', { loose: true }]
  ]
};
