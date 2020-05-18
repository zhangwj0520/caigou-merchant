module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    commonjs: true,
  },
  parser: 'babel-eslint',
  extends: ['plugin:react/recommended', 'airbnb'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@assets', './src/assets'],
          ['@store', './src/store'],
          ['@common', './src/common'],
          ['@components', './src/components'],
          ['@pages', './src/pages'],
          ['@routes', './src/routes'],
          ['@layouts', './src/layouts'],
          ['@styles', './src/styles'],
          ['@utils', './src/utils'],
          ['@hooks', './src/hooks'],
          ['@config', './src/config.js'],
        ],
        extensions: ['.js', '.jsx', '.json', 'scss'],
      },
    },
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    // basic & style
    // 'no-undef': 'warn',
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'no-use-before-define': 'off',
    'no-unused-vars': 'warn',
    'max-nested-callbacks': [2, 5],
    indent: [
      'error',
      2,
      {
        ignoredNodes: ['TemplateLiteral'],
      },
    ],
    'default-case': 'off',
    'global-require': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'dot-notation': 'off',
    'template-curly-spacing': 'off',
    'max-len': [
      'error',
      {
        code: 120,
        tabWidth: 2,
        comments: 100,
        ignoreUrls: true,
        ignoreRegExpLiterals: true,
        ignoreTemplateLiterals: true,
      },
    ],

    //import
    'import/no-extraneous-dependencies': 'off',
    'import/no-named-as-default': 'off',
    'import/prefer-default-export': 'off',
    'import/no-dynamic-require': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
      },
    ],

    // react
    'react/destructuring-assignment': 'off',
    'react/jsx-closing-tag-location': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-first-prop-new-line': ['error', 'multiline'],
    'react/jsx-filename-extension': 'off',
    'react/require-default-props': 'off',
    'react/require-extension': 'off',
    'react/self-closing-comp': 'off',
    'react/sort-comp': 'off',
    'react/jsx-no-undef': 'error',
    'react/react-in-jsx-scope': 'error',
    'react/require-render-return': 'error',
    'react/destructuring-assignment': 'off',
    'react/display-name': 'off',
    'react/no-array-index-key': 'off',
    'react/prop-types': 'off',
    'react/jsx-indent': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-indent-props': 'off',
    'react/jsx-props-no-spreading': 'off',

    // jsx-a11y
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/anchor-is-valid': 'off',

    // react-hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
