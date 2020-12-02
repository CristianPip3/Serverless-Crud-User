module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: ['eslint:recommended', 'standard'],
  parserOptions: {
    ecmaVersion: 2018
  },
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // Show error on functions with no space before function
    'space-before-function-paren': 'error'
  }
};
