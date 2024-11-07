/* eslint-disable react/prop-types */
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
  Tooltip,
} from "@chakra-ui/react";
// Importa componentes do Chakra UI para criar o layout e o estilo dos elementos

import { Link } from "react-router-dom";
// Importa `Link` para permitir a navegação entre páginas sem recarregar a aplicação

import { imagePath } from "../services/api";
// Importa `imagePath` para construir a URL da imagem do item

import { useFirestore } from "../services/firestore";
import { useAuth } from "../context/useAuth";
// Importa hooks personalizados para acessar funcionalidades de autenticação e Firestore

import { CheckIcon, StarIcon } from "@chakra-ui/icons";
// Importa ícones do Chakra UI

const WatchlistCard = ({ type, item, setWatchlist }) => {
  // Declara o componente `WatchlistCard` que recebe `type`, `item` e `setWatchlist` como props
  // `type` indica o tipo de item (filme ou série), `item` contém os dados do item
  // `setWatchlist` permite atualizar a lista de assistidos

  const { removeFromWatchlist } = useFirestore();
  const { user } = useAuth();
  // Usa os hooks personalizados para acessar a função `removeFromWatchlist` e o `user` autenticado

  const handleRemoveClick = (event) => {
    event.preventDefault(); // Previne o comportamento padrão do link
    removeFromWatchlist(user?.uid, item.id).then(() => {
      setWatchlist((prev) => prev.filter((el) => el.id !== item.id));
      // Remove o item da lista no Firestore e atualiza a lista localmente
    });
  };

  return (
    <Link to={`/${type}/${item.id}`}>
      {/* Link para a página de detalhes do item com base no tipo e no ID */}

      <Flex gap="4">
        {/* Flex container para o layout horizontal dos elementos do card */}

        <Box position={"relative"} w={"150px"}>
          {/* Box para a imagem do item com posição relativa para ajustar o ícone de remoção */}

          <Image
            src={`${imagePath}/${item.poster_path}`}
            alt={item.title}
            height={"200px"}
            minW={"150px"}
            objectFit={"cover"}
          />
          {/* Exibe a imagem do item com `objectFit` para ajustar a imagem ao tamanho do box */}

          <Tooltip label="Remove from watchlist">
            {/* Tooltip exibido ao passar o mouse sobre o ícone de remoção */}

            <IconButton
              aria-label="Remove from watchlist"
              icon={<CheckIcon />}
              size={"sm"}
              colorScheme="green"
              position={"absolute"}
              zIndex={"999"}
              top="2px"
              left={"2px"}
              onClick={handleRemoveClick}
            />
            {/* Botão de remoção com ícone `CheckIcon` e posição absoluta no canto da imagem */}
          </Tooltip>
        </Box>

        <Box>
          <Heading fontSize={{ base: 'xl', md: "2xl" }} noOfLines={1}>
            {item?.title || item?.name}
          </Heading>
          {/* Exibe o título do item, limitando a uma linha */}

          <Heading fontSize={"sm"} color={"green.200"} mt="2">
            {new Date(item?.release_date || item?.first_air_date).getFullYear() || "N/A"}
          </Heading>
          {/* Exibe o ano de lançamento ou "N/A" caso a data não esteja disponível */}

          <Flex alignItems={"center"} gap={2} mt="4">
            <StarIcon fontSize={"small"} />
            <Text textAlign={"center"} fontSize="small">
              {item?.vote_average?.toFixed(1)}
            </Text>
          </Flex>
          {/* Exibe a avaliação média do item com um ícone de estrela */}

          <Text mt="4" fontSize={{ base: "xs", md: "sm" }} noOfLines={5}>
            {item?.overview}
          </Text>
          {/* Exibe a sinopse do item, limitando a cinco linhas */}
        </Box>
      </Flex>
    </Link>
  );
};

export default WatchlistCard;
// Exporta o componente `WatchlistCard` para uso em outras partes da aplicação
