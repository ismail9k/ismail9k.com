import { createConfigForNuxt } from '@nuxt/eslint-config/flat';

export default await createConfigForNuxt({}, [
  {
    rules: {
      indent: ['error', 2],
      quotes: ['error', 'single'],
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'vue/no-multiple-template-root': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off',
      'vue/require-prop-types': 'off',
      'vue/no-v-html': 'off',
      'import/no-mutable-exports': 'off'
    }
  }
]);
