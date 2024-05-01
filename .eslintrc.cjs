// @ts-check
const FILES = {
  configs: '**/*{rc,.config}.{js,cjs,mjs,ts,cts,mts}',
  test: '{app,pages,src}/**/*.{spec,test}.{js,jsx,ts,tsx}',
  js: '**/*.{js,cjs,mjs}',
  tsSrc: 'src/**/*.{ts,tsx}',
  tsRouter: '{app,pages}/**/*.{ts,tsx}',
  ts: '{src,app,pages}/**/*.{ts,tsx}',
};

const shared = {
  plugins: [
    'import',
    '@typescript-eslint',
    '@feature-sliced/eslint-plugin-messages',
    '@stylistic/ts',
    'vitest',
    'testing-library',
    'jest-dom',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:import/recommended',
    'plugin:import/react',
    'plugin:import/typescript',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    '@feature-sliced',
    'plugin:testing-library/react',
    'plugin:jest-dom/recommended',
    'next/core-web-vitals',
    'prettier',
  ],
};

/** @type {import('eslint').Linter.ConfigOverride[]} */
const overrides = [
  /** airbnb rules override */
  {
    files: FILES.ts,
    rules: {
      'import/prefer-default-export': 'off',
      'no-underscore-dangle': 'off',
    },
  },

  /** enable void usage for lambdas, promises, etc. */
  {
    files: FILES.ts,
    rules: {
      'no-void': 'off',
      '@typescript-eslint/no-meaningless-void-operator': 'off',
      '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreVoidOperator: true }],
    },
  },

  /** allow nextjs pages router to import from fsd pages and _app */
  {
    files: FILES.tsRouter,
    rules: {
      'boundaries/element-types': 'off',
      'import/no-internal-modules': 'off', // fsd linter banned `~/src/_app` imports
    },
  },

  /** some custom rules */
  {
    files: FILES.ts,
    rules: {
      '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-exports': ['error', { fixMixedExportsWithInlineTypeSpecifier: true }],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: { attributes: false } }],
      'react/jsx-props-no-spreading': 'off',
      'react/function-component-definition': ['error', { unnamedComponents: 'arrow-function' }],
      'curly': ['error', 'all'],
      'consistent-return': ['error', { treatUndefinedAsUnspecified: true }],
      'import/no-cycle': 'error',
      'jsx-a11y/label-has-associated-control': 'off', // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/966
    },
  },

  /** some thor's rules */
  {
    files: FILES.ts,
    rules: {
      'complexity': ['error', 10],
      'max-depth': ['error', 4],
      'max-lines-per-function': ['error', { max: 40, skipBlankLines: true, skipComments: true }],
      'max-nested-callbacks': ['error', 4],
      'max-statements': ['error', 10],
      'no-constant-binary-expression': 'error',
      'no-implicit-coercion': 'error',
      'no-negated-condition': 'error',
      'padding-line-between-statements': ['error', { blankLine: 'always', prev: '*', next: 'return' }],
      'object-shorthand': 'error',
      'require-atomic-updates': 'error',
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import/no-empty-named-blocks': 'error',
      'import/no-useless-path-segments': ['error', { noUselessIndex: true }],
      'import/no-duplicates': ['error', { considerQueryString: true }],
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          'groups': ['builtin', 'external', 'internal', ['parent', 'sibling'], 'object', 'type', 'index'],
        },
      ],
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: true,
        },
      ],
      '@typescript-eslint/restrict-plus-operands': [
        'error',
        { allowNumberAndString: false, skipCompoundAssignments: false },
      ],
      '@typescript-eslint/method-signature-style': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/require-array-sort-compare': 'error',
      '@typescript-eslint/no-shadow': [
        'error',
        {
          hoist: 'all',
          allow: ['resolve', 'reject', 'done', 'next', 'err', 'error'],
          ignoreTypeValueShadow: true,
          ignoreFunctionTypeParameterNameValueShadow: true,
        },
      ],
      'no-return-await': 'off',
      '@typescript-eslint/return-await': 'error',
      '@stylistic/ts/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: ['case', 'default', 'block', 'block-like', 'multiline-block-like', 'interface', 'type'],
          next: '*',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: ['export'],
        },
        {
          blankLine: 'any',
          prev: ['function-overload', 'export'],
          next: ['function-overload', 'function', 'export'],
        },
        {
          blankLine: 'any',
          prev: ['const', 'let'],
          next: ['const', 'let'],
        },
        {
          blankLine: 'always',
          prev: '*',
          next: ['switch', 'while', 'try', 'return', 'if', 'interface', 'type', 'function'],
        },
      ],
    },
  },

  /** disable some rules for test files */
  {
    files: FILES.test,
    rules: {
      'max-statements': ['error', 10, { ignoreTopLevelFunctions: true }],
    },
  },

  /** disable specific rules for config files */
  {
    files: FILES.configs,
    rules: {
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
  },

  /** disable type-aware linting for js files */
  {
    files: FILES.js,
    extends: ['plugin:@typescript-eslint/disable-type-checked'],
  },
];

/** @type {import('eslint').Linter.Config} */
const config = {
  noInlineConfig: true,
  reportUnusedDisableDirectives: true,
  parser: '@typescript-eslint/parser',
  parserOptions: { project: true },
  processor: '@feature-sliced/messages/fs',
  ...shared,
  overrides,
};

module.exports = config;
