import { Button, Flex, Text } from "@chakra-ui/react";
// Importa componentes do Chakra UI para o layout e exibição de botões e texto

import PropTypes from "prop-types";
// Importa `PropTypes` para validação dos tipos das props recebidas

const PaginationComponent = ({ activePage, totalPages, setActivePage }) => {
  // Define o componente `PaginationComponent` que recebe `activePage`, `totalPages`, e `setActivePage` como props

  return (
    <Flex gap={"2"} alignItems={"center"}>
      {/* Contêiner Flex para os botões de navegação e a exibição da página atual */}
      
      <Flex gap={"2"} maxW={"250px"} my="10">
        {/* Contêiner Flex que limita a largura e define margens verticais para os botões */}
        
        <Button
          onClick={() => setActivePage(activePage - 1)}
          isDisabled={activePage === 1}
        >
          Voltar
        </Button>
        {/* Botão "Voltar" para ir para a página anterior, desabilitado se `activePage` for 1 (primeira página) */}
        
        <Button
          onClick={() => setActivePage(activePage + 1)}
          isDisabled={activePage === totalPages}
        >
          Próximo
        </Button>
        {/* Botão "Próximo" para ir para a página seguinte, desabilitado se `activePage` for igual a `totalPages` */}
      </Flex>

      <Flex gap="1">
        <Text>{activePage}</Text>
        <Text>de</Text>
        <Text>{totalPages}</Text>
      </Flex>
      {/* Exibe a página atual e o total de páginas no formato "n de m" */}
    </Flex>
  );
};

PaginationComponent.propTypes = {
  activePage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setActivePage: PropTypes.func.isRequired
};
// Define `PropTypes` para garantir que `activePage` e `totalPages` sejam números obrigatórios
// e que `setActivePage` seja uma função obrigatória

export default PaginationComponent;
// Exporta o componente `PaginationComponent` para ser usado em outras partes da aplicação
