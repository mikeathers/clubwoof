module.exports = {
  root: true,
  ignorePatterns: [
    'node_modules/',
    '**/node_modules/*',
    '.next/',
    'out/',
    'public/',
    '.prettierrc.js',
    '.eslintrc.js',
    'cdk-exports-dev.js',
    'backend/',
  ],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 8,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@next/next/recommended',
    'plugin:storybook/recommended',
  ],
  overrides: [
    // This configuration will apply only to TypeScript files
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: './',
      },
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:@next/next/recommended',
      ],
      rules: {
        'react/react-in-jsx-scope': 0,
        '@typescript-eslint/restrict-template-expressions': 0,
        'prefer-template': 1,
        '@typescript-eslint/unbound-method': 0,
        'react/prop-types': 0,
      },
    },
    {
      files: ['**/*.{test,tests}.{ts,tsx}', './test-utils'],
      rules: {
        '@typescript-eslint/no-unsafe-return': 0,
        'react/display-name': 0,
        'jsx-a11y/alt-text': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/anchor-has-content': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/anchor-is-valid': 0,
        '@typescript-eslint/no-unsafe-assignment': 0,
      },
    },
    {
      files: ['./src/pages/**/*.{tsx,ts}'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 0,
      },
    },
  ],
  plugins: ['import', '@typescript-eslint', 'react', 'react-hooks'],
  globals: {
    window: true,
    document: true,
    localStorage: true,
    FormData: true,
    FileReader: true,
    Blob: true,
    navigator: true,
    fetch: false,
    browser: true,
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
}
