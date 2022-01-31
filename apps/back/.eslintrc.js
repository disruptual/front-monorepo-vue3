module.exports = {
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  rules: {
    'no-unused-vars': 'off',
    'vue/no-unused-vars': [
      'error',
      {
        ignorePattern: '^_'
      }
    ],
    'vue/script-setup-uses-vars': 1
  },
  env: {
    node: true,
    es6: true
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  }
};
