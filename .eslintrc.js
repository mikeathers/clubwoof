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
    'jest/globals': true,
    jest: true,
  },
  parserOptions: {ecmaVersion: 8},
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
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
        'airbnb',
        'airbnb/hooks',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:testing-library/react',
        'plugin:jest-dom/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:jsx-a11y/recommended',
        'plugin:jest/recommended',
        'plugin:jest/style',
        'plugin:@next/next/recommended',
      ],
      rules: {
        'testing-library/no-unnecessary-act': ['error', {isStrict: false}],
        'testing-library/prefer-screen-queries': 'off',
        'react/function-component-definition': 'off',
        'no-use-before-define': 'off',
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/require-default-props': 'off',
        'react/jsx-filename-extension': [0],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'react/jsx-props-no-spreading': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-useless-constructor': 'error',
        'jsx-a11y/anchor-is-valid': 'off',
        'jsx-a11y/interactive-supports-focus': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'no-return-assign': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/unbound-method': 'off',
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
            optionalDependencies: false,
            peerDependencies: false,
          },
        ],
        'import/prefer-default-export': 'off',
        'prettier/prettier': ['error'],
        'import/extensions': 'off',
        'import/no-cycle': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        'react/no-array-index-key': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        'prefer-template': 1, // Prefer template strings,
        'consistent-return': 'off',
      },
      plugins: [
        'import',
        '@typescript-eslint',
        'jest',
        'prettier',
        'react',
        'react-hooks',
        'testing-library',
        'jest-dom',
      ],
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
        jest: true,
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
    },
  ],
}
