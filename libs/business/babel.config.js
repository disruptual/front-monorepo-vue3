// used only in jest

module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['@babel/preset-env'],
    plugins: [
      '@babel/plugin-transform-runtime',
      'babel-plugin-transform-vite-meta-env',
      'babel-plugin-transform-vite-meta-glob'
    ]
  };
};
