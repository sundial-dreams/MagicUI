const devEnvs = ['development', 'test'];
const devPlugins = [require('react-hot-loader/babel')];
const prodPlugins = [
  require('@babel/plugin-transform-react-constant-elements'),
  require('@babel/plugin-transform-react-inline-elements'),
  require('babel-plugin-transform-react-remove-prop-types')
];

module.exports = api => {
  const development = api.env(devEnvs);

  return {
    presets: [
      [require('@babel/preset-env'), {
        targets: {
          electron: 'v8.2.0'
        }
      }],
      require('@babel/preset-typescript'),
      [require('@babel/preset-react'), {development, throwIfNamespace: false}]
    ],
    plugins: [
      [require('@babel/plugin-proposal-optional-chaining'), {loose: false}],
      [require('@babel/plugin-proposal-decorators'), {legacy: true}],
      require('@babel/plugin-syntax-dynamic-import'),
      require('@babel/plugin-proposal-class-properties'),
      ...(development ? devPlugins : prodPlugins)
    ]
  };
};