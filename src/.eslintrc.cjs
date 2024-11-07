// Configurações principais do ESLint para o projeto
module.exports = {
    root: true, // Define este como o arquivo de configuração raiz
    env: { browser: true, es2020: true }, // Ambiente de execução: navegador, padrão ES2020
    extends: [
      'eslint:recommended', // Extende as recomendações padrão do ESLint
      'plugin:react/recommended', // Regras recomendadas para React
      'plugin:react/jsx-runtime', // Suporte para JSX
      'plugin:react-hooks/recommended', // Regras recomendadas para hooks do React
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'], // Ignora arquivos na pasta dist e .eslintrc.cjs
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' }, // Usa o parser ES mais recente
    settings: { react: { version: '18.2' } }, // Define a versão do React
    plugins: ['react-refresh'], // Plugin para recarregamento do React
    rules: {
      'react-refresh/only-export-components': [
        'warn', // Aviso apenas para exportação de componentes
        { allowConstantExport: true }, // Permite a exportação de constantes
      ],
    },
  }
  