module.exports = {
  root: true,
  env: {
    node: true,
    'vue/setup-compiler-macros': true // 解决vue3中使用defineProps，认为未定义报错
  },

  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off', // 关闭命名规则，将不会校验组件名
    indent: ['off', 2], // 关闭校验空格规则
    'no-unused-vars': 'off', // 关闭 "is assigned a value but never used" 警告
    '@typescript-eslint/no-explicit-any': ['off'], // 允许any类型
    'space-before-function-paren': 'off',
    '@typescript-eslint/ban-ts-comment': 0, // 0关闭 1警告 2报错
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-empty-function': 'off',
    'no-empty-arrow-function': 'off',
    'prefer-promise-reject-errors':'off',
    'func-call-spacing':'off'
  }
}
