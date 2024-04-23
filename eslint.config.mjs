// @ts-check
import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import prettier from 'eslint-config-prettier';
import tsESLint from 'typescript-eslint';
import stylisticTsESLint from '@stylistic/eslint-plugin-ts';
import jestESLint from 'eslint-plugin-jest';

const tsFiles = '{app,pages,src}/**/*.{ts,tsx}';
const tsTestFiles = '{app,pages,src}/**/*,{spec,test}.{ts,tsx}';

/** @type {import('typescript-eslint').ConfigWithExtends} */
const baseSettings = {
  files: [tsFiles],
  languageOptions: {
    ecmaVersion: 'latest',
    parserOptions: { project: true },
  },
  linterOptions: {
    noInlineConfig: true,
    reportUnusedDisableDirectives: 'error',
  },
};

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

export default tsESLint.config(
  {
    name: 'recommended/strict rules',
    files: [tsFiles],
    extends: [
      eslint.configs.recommended,
      ...tsESLint.configs.strictTypeChecked,
      ...tsESLint.configs.stylisticTypeChecked,
      ...compat.extends('airbnb', 'airbnb/hooks', 'airbnb-typescript'),
    ],
  },
  {
    name: 'import rules',
    files: [tsFiles],
    extends: [...compat.extends('plugin:import/recommended', 'plugin:import/react', 'plugin:import/typescript')],
  },
  {
    name: 'tanstack/query rules',
    files: [tsFiles],
    extends: [...compat.extends('plugin:@tanstack/eslint-plugin-query/recommended')],
  },
  /* {
    name: 'fsd rules', // broken `Error: Key "languageOptions": Key "ecmaVersion": Expected a number or "latest".`
    files: [tsFiles],
    extends: [...compat.extends('@feature-sliced')],
  }, */
  {
    name: 'jest rules',
    files: [tsTestFiles],
    ...jestESLint.configs['flat/recommended'],
  },
  {
    name: 'nextjs rules',
    files: [tsFiles],
    extends: [...compat.extends('next/core-web-vitals')],
  },
  {
    name: 'disable formatting rules',
    files: [tsFiles],
    extends: [prettier],
  },
  {
    name: 'airbnb rules override',
    files: [tsFiles],
    rules: {
      'import/prefer-default-export': 'off',
    },
  },
  {
    name: 'enable void usage for lambdas, promises, etc.',
    files: [tsFiles],
    rules: {
      'no-void': 'off',
      '@typescript-eslint/no-meaningless-void-operator': 'off',
      '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreVoidOperator: true }],
    },
  },
  {
    name: 'some custom rules',
    files: [tsFiles],
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
  {
    name: "some thor's rules",
    files: [tsFiles],
    plugins: { '@stylistic/ts': stylisticTsESLint },
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
  {
    files: [tsTestFiles],
    rules: {
      'max-statements': ['error', 10, { ignoreTopLevelFunctions: true }],
    },
  },
  {
    name: 'settings',
    ...baseSettings,
  }
);

/* [
  js.configs.recommended,
  ...compat.extends('airbnb'),
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: 'error',
    },
  },
  {
    files: ['eslint.config.mjs'],
    rules: {
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
  },
]; */
