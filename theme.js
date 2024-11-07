import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const styles = {
  global: {
    body: {
      bg: "gray.900", // Cor de fundo direto para o modo escuro
      color: "whiteAlpha.900", // Cor do texto
    },
  },
};

const theme = extendTheme({ config, styles });

export default theme;