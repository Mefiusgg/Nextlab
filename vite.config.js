import { defineConfig } from 'vite' // Importa a função defineConfig do Vite, usada para definir a configuração do Vite
import react from '@vitejs/plugin-react' // Importa o plugin oficial do Vite para React, que oferece suporte a JSX e outras funcionalidades específicas do React

// https://vitejs.dev/config/  - Comentário com o link para a documentação oficial do Vite, onde você pode aprender mais sobre as configurações.

export default defineConfig({
  plugins: [react()], // Configura o Vite para usar o plugin React, permitindo que o Vite processe arquivos JSX e otimize o ambiente de desenvolvimento para React
})