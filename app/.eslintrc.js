module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'no-unused-expressions': 'off',
    'no-sequences': 'off',
    'no-var': 'off',
    'eqeqeq': 'off',
    'new-cap': 'off',
    'no-void': 'off',
    'no-undef': 'off',
    'no-prototype-builtins': 'off',
    'vue/no-mutating-props': 'off',
    'no-unused-vars' : 'off',
    'no-useless-escape': 'off',
    'unicorn/prefer-starts-ends-with': 'off'
  },
}
