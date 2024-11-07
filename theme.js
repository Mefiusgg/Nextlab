import { extendTheme } from "@chakra-ui/react"; // Importa a função extendTheme do Chakra UI para personalizar o tema

// Define a configuração inicial do tema
const config = {
  initialColorMode: "dark", // Define o modo de cor inicial como 'dark', ou seja, modo escuro
  useSystemColorMode: false, // Desativa a opção de usar o modo de cor do sistema (a aplicação não muda automaticamente com base nas configurações do sistema)
};

// Define estilos globais para a aplicação
const styles = {
  global: { // Aplica estilos globais ao corpo da página
    body: {
      bg: "gray.900", // Define a cor de fundo do corpo da página para uma tonalidade escura de cinza (para o modo escuro)
      color: "whiteAlpha.900", // Define a cor do texto para uma tonalidade de branco com opacidade ajustada, para garantir boa legibilidade no modo escuro
    },
  },
};

// Cria o tema estendido com a configuração e estilos definidos acima
const theme = extendTheme({ config, styles });

// Exporta o tema para ser utilizado em outros lugares da aplicação
export default theme;