module.exports = {
  root: true,
  ignorePatterns: [
    'node_modules/*',
    '**/node_modules/',
    'cdk.out/',
    '.prettierrc.js',
    '.eslintrc.js',
    'out',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
    tsconfigRootDir: './',
  },
  plugins: ['import', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  overrides: [
    {
      files: ['./src/*-stack'],
      rules: {
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-unused-vars': 0,
      },
    },
  ],
  rules: {
    '@typescript-eslint/restrict-template-expressions': 0,
    '@typescript-eslint/ban-ts-comment': 0,
  },
  globals: {
    page: true,
    browser: true,
    context: true,
    jestPuppeteer: true,
    document: true,
    localStorage: true,
  },
  settings: {
    'import/core-modules': ['aws-sdk'],
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
      node: {
        moduleDirectory: ['node_modules', 'src/'],
        extensions: ['.ts', '.tsx', '.json'],
      },
    },
  },
}
