import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'coverage', 'uploads'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: { ecmaVersion: 2022, globals: { document: 'readonly', window: 'readonly', navigator: 'readonly', localStorage: 'readonly', FormData: 'readonly', fetch: 'readonly', requestAnimationFrame: 'readonly', HTMLElement: 'readonly' } },
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  {
    files: ['server/**/*.ts', 'shared/**/*.ts', 'scripts/**/*.mjs', '*.config.{js,ts}'],
    languageOptions: { ecmaVersion: 2022, globals: { process: 'readonly', Buffer: 'readonly', fetch: 'readonly', setTimeout: 'readonly', console: 'readonly' } },
  },
);
