import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintImport from 'eslint-plugin-import';
import eslintUnusedImports from 'eslint-plugin-unused-imports';
import eslintUnicorn from 'eslint-plugin-unicorn';
import typeScriptESLintParser from '@typescript-eslint/parser';
import svelteEslintParser from 'svelte-eslint-parser';
import globals from 'globals';

const compat = new FlatCompat();

export default [
  {
    ignores: [
      '.DS_Store',
      'node_modules',
      '/build',
      '/.svelte-kit',
      '/package',
      '.env',
      '.env.*',
      '!.env.example',
      'yarn.lock',
      'dist',
      'eslint.config.js'
    ]
  },
  eslint.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...eslintPluginSvelte.configs['flat/recommended'],
  ...compat.extends('plugin:import/recommended', 'plugin:import/warnings'),
  {
    plugins: {
      import: eslintImport,
      'unused-imports': eslintUnusedImports,
      unicorn: eslintUnicorn
    },
    languageOptions: {
      parser: typeScriptESLintParser,
      parserOptions: {
        ecmaVersion: 2020,
        extraFileExtensions: ['.svelte'],
        project: ['./tsconfig.json'],
        sourceType: 'module'
      },
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node
      }
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: ['tsconfig.json']
        }
      }
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          format: ['PascalCase'],
          selector: 'class'
        },
        {
          format: ['PascalCase'],
          selector: 'interface'
        },
        {
          format: ['PascalCase'],
          selector: 'typeAlias'
        }
      ],
      '@typescript-eslint/no-empty-interface': [
        'error',
        {
          allowSingleExtends: false
        }
      ],
      '@typescript-eslint/no-inferrable-types': [
        'error',
        {
          ignoreParameters: true,
          ignoreProperties: false
        }
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      eqeqeq: 'error',
      'import/no-default-export': 'error',
      'import/no-unused-modules': [
        'error',
        {
          unusedExports: true
        }
      ],
      'import/order': [
        'error',
        {
          alphabetize: {
            caseInsensitive: true,
            order: 'asc'
          }
        }
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: ['./', '../', '..']
        }
      ],
      'unicorn/filename-case': [
        'error',
        {
          case: 'camelCase'
        }
      ],
      'unused-imports/no-unused-imports': 'error'
    }
  },
  {
    files: ['*.svelte'],
    languageOptions: {
      parser: svelteEslintParser,
      parserOptions: {
        parser: typeScriptESLintParser
      }
    },
    rules: {
      'svelte/no-at-html-tags': 'off',
      'unicorn/filename-case': [
        'error',
        {
          case: 'pascalCase'
        }
      ]
    }
  },
  {
    files: ['src/routes/**/*.svelte'],
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          case: 'camelCase'
        }
      ]
    }
  },
  {
    ...compat.extends('plugin:@typescript-eslint/recommended-requiring-type-checking'),
    files: ['*.ts'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json']
      }
    },
    rules: {
      '@typescript-eslint/no-floating-promises': [
        'error',
        {
          ignoreIIFE: true,
          ignoreVoid: false
        }
      ],
      '@typescript-eslint/prefer-regexp-exec': 'error',
      '@typescript-eslint/promise-function-async': [
        'error',
        {
          checkArrowFunctions: false,
          checkFunctionDeclarations: true,
          checkFunctionExpressions: false,
          checkMethodDeclarations: false
        }
      ]
    }
  },
  {
    files: ['vite.config.ts'],
    rules: {
      'import/no-default-export': 'off'
    }
  },
  {
    files: ['svelte.config.js'],
    rules: {
      'import/no-default-export': 'off',
      'import/no-unused-modules': 'off'
    }
  }
];
