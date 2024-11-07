module.exports = {
  // Define que este arquivo é a configuração principal do ESLint.
  root: true, 

  // Define o ambiente em que o código será executado.
  env: { 
    // O código será executado no navegador (indica que você está desenvolvendo para o frontend).
    browser: true, 
    
    // O código usa recursos do ECMAScript 2020 (es6+).
    es2020: true 
  },

  // Especifica os "extends", ou seja, as configurações que o ESLint vai herdar.
  extends: [
    // Usa as regras recomendadas do ESLint.
    'eslint:recommended',
    
    // Usa as regras recomendadas para projetos React.
    'plugin:react/recommended',
    
    // Usa as regras recomendadas para o JSX (React).
    'plugin:react/jsx-runtime',
    
    // Usa as regras recomendadas para hooks do React (como useState, useEffect, etc.).
    'plugin:react-hooks/recommended',
  ],

  // Ignora os arquivos ou diretórios especificados para não serem analisados pelo ESLint.
  ignorePatterns: ['dist', '.eslintrc.cjs'],

  // Especifica as opções de parsing do JavaScript.
  parserOptions: { 
    // Define a versão do ECMAScript que será usada no código.
    ecmaVersion: 'latest', 
    
    // Define que o código é um módulo (pode usar import/export).
    sourceType: 'module' 
  },

  // Configurações específicas do React.
  settings: { 
    react: { 
      // Define a versão do React utilizada no projeto para configurar as regras de linting corretamente.
      version: '18.2' 
    }
  },

  // Define os plugins que o ESLint vai usar.
  plugins: ['react-refresh'],

  // Regras personalizadas de linting.
  rules: {
    // Configura a regra para o plugin "react-refresh" (usado em projetos com React Fast Refresh).
    'react-refresh/only-export-components': [
      // Define a regra como "warn", ou seja, ela será um aviso.
      'warn', 
      
      // Permite exportações constantes (constantes exportadas não serão sinalizadas como erro).
      { allowConstantExport: true },
    ],
  },
};
