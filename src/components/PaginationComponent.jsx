import { Button, Flex, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

const PaginationComponent = ({ activePage, totalPages, setActivePage }) => {
  return (
    <Flex gap={"2"} alignItems={"center"}>
      <Flex gap={"2"} maxW={"250px"} my="10">
        <Button
          onClick={() => setActivePage(activePage - 1)}
          isDisabled={activePage === 1}
        >
          Voltar
        </Button>
        <Button
          onClick={() => setActivePage(activePage + 1)}
          isDisabled={activePage === totalPages}
        >
          Próximo
        </Button>
      </Flex>
      <Flex gap="1">
        <Text>{activePage}</Text>
        <Text>de</Text>
        <Text>{totalPages}</Text>
      </Flex>
    </Flex>
  );
};

PaginationComponent.propTypes = {
  activePage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setActivePage: PropTypes.func.isRequired
};

export default PaginationComponent;
