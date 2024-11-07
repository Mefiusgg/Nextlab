// Importa as dependências necessárias para configurar o ESLint
import js from '@eslint/js'  // Importa a configuração base do ESLint para JavaScript.
import globals from 'globals'  // Importa os globais que o ESLint deve considerar.
import react from 'eslint-plugin-react'  // Importa o plugin do ESLint para React.
import reactHooks from 'eslint-plugin-react-hooks'  // Importa o plugin do ESLint para hooks do React.
import reactRefresh from 'eslint-plugin-react-refresh'  // Importa o plugin para React Fast Refresh.

export default [
  // Configurações globais do ESLint, como ignorar o diretório 'dist'.
  { ignores: ['dist'] },

  // Regra de configuração para arquivos com extensões .js e .jsx
  {
    files: ['**/*.{js,jsx}'],  // Aplica as regras para todos os arquivos .js e .jsx do projeto.
    
    // Configurações de linguagem e opções do ESLint para os arquivos analisados
    languageOptions: {
      ecmaVersion: 2020,  // Define a versão do ECMAScript a ser usada, neste caso, ECMAScript 2020.
      globals: globals.browser,  // Define os globais como se o código estivesse rodando no navegador.
      parserOptions: {
        ecmaVersion: 'latest',  // Define a versão mais recente do ECMAScript.
        ecmaFeatures: { jsx: true },  // Habilita o suporte a JSX (necessário para React).
        sourceType: 'module',  // Permite usar import/export.
      },
    },
    
    // Configurações específicas do React (versão 18.3)
    settings: { react: { version: '18.3' } },
    
    // Declara os plugins utilizados, incluindo o React e seus plugins associados
    plugins: {
      react,  // Usa o plugin React para verificar as práticas recomendadas do React.
      'react-hooks': reactHooks,  // Usa o plugin React Hooks para verificar boas práticas de hooks.
      'react-refresh': reactRefresh,  // Usa o plugin React Refresh para linting com React Fast Refresh.
    },
    
    // Regras do ESLint aplicadas, combinando as configurações de várias fontes
    rules: {
      // Aplica as regras recomendadas do ESLint para JavaScript
      ...js.configs.recommended.rules,
      
      // Aplica as regras recomendadas do ESLint para React
      ...react.configs.recommended.rules,
      
      // Aplica as regras do React para JSX Runtime (necessário para o React 17+)
      ...react.configs['jsx-runtime'].rules,
      
      // Aplica as regras recomendadas para hooks do React
      ...reactHooks.configs.recommended.rules,
      
      // Desativa a regra de JSX que impede o uso de "target='_blank'" sem "rel='noopener noreferrer'"
      'react/jsx-no-target-blank': 'off',

      // Configura uma regra do plugin 'react-refresh' para emitir um aviso ao exportar componentes (permitindo exportações constantes)
      'react-refresh/only-export-components': [
        'warn',  // Emite um aviso quando a regra for violada.
        { allowConstantExport: true },  // Permite exportações constantes (não considera como erro).
      ],
    },
  },
]
