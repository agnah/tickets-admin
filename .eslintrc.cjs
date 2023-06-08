module.exports = {
  env: { browser: true, es2020: true },
  extends: 'standard',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'react'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'react/jsx-uses-vars': 'error',
    'react/jsx-uses-react': 'error'
  }
}
