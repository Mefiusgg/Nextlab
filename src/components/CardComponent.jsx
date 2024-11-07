/* eslint-disable react/prop-types */
// Desativa a verificação de tipos de propriedades pelo ESLint

import { Box, Flex, Image, Text } from "@chakra-ui/react";
// Importa componentes de layout e estilo do Chakra UI

import { Link } from "react-router-dom";
// Importa o Link para navegação entre rotas

import { imagePath } from "../services/api";
// Caminho base para imagens, usado junto com o `poster_path` de cada item

import { StarIcon } from "@chakra-ui/icons";
// Ícone de estrela para indicar a avaliação

const CardComponent = ({ item, type }) => {
  return (
    <Link to={`/${type}/${item?.id}`}>
      {/* Link dinâmico para a página de detalhes do item */}
      
      <Box
        position="relative"
        transform="scale(1)"
        _hover={{
          transform: { base: "scale(1)", md: "scale(1.08)" },
          transition: "transform 0.2s ease-in-out",
          zIndex: "10",
          "& .overlay": { opacity: 1 },
        }}
      >
        <Image
          src={`${imagePath}/${item?.poster_path}`}
          alt={item?.title || item?.name}
          height="100%"
        />
        {/* Imagem do card com caminho dinâmico e altura 100% */}
        
        <Box
          className="overlay"
          pos="absolute"
          p="2"
          bottom="0"
          left="0"
          w="100%"
          h="33%"
          bg="rgba(0,0,0,0.9)"
          opacity="0"
          transition="opacity 0.3s ease-in-out"
        >
          <Text textAlign="center">{item?.title || item?.name}</Text>
          {/* Exibe o título do filme ou nome da série */}
          
          <Text textAlign="center" fontSize="x-small" color="green.200">
            {new Date(item?.release_date || item?.first_air_date).getFullYear() || "N/A"}
          </Text>
          {/* Exibe o ano de lançamento ou de primeira exibição */}
          
          <Flex alignItems="center" justifyContent="center" gap={2} mt="4">
            <StarIcon fontSize="small" />
            <Text>{item?.vote_average?.toFixed(1)}</Text>
          </Flex>
          {/* Exibe a avaliação média com uma casa decimal */}
        </Box>
      </Box>
    </Link>
  );
};

export default CardComponent;
// Exporta o componente para uso em outras partes da aplicação
