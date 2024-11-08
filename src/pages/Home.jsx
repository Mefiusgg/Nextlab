import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Skeleton,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { fetchTrending } from "../services/api";
import CardComponent from "../components/CardComponent";

const Home = () => {
  // Estado para armazenar dados dos filmes/séries em tendência
  const [data, setData] = useState([]);
  
  // Estado para indicar se a página está carregando
  const [loading, setLoading] = useState(true);
  
  // Estado para determinar o período de tendência: 'day' (hoje) ou 'week' (semana)
  const [timeWindow, setTimeWindow] = useState("day");
  
  // Estado para controlar a visibilidade do pop-up de boas-vindas
  const [isPopupVisible, setIsPopupVisible] = useState(true);

  // useEffect que busca os dados da API ao montar o componente ou ao mudar o filtro de tempo
  useEffect(() => {
    setLoading(true); // Define estado de carregamento como verdadeiro antes da busca
    fetchTrending(timeWindow) // Chama a função para buscar filmes/séries em tendência conforme o período
      .then((res) => {
        setData(res); // Armazena os dados recebidos no estado 'data'
      })
      .catch((err) => {
        console.log(err, "err"); // Loga erro no console, caso ocorra
      })
      .finally(() => {
        setLoading(false); // Define carregamento como falso após finalizar a busca
      });
  }, [timeWindow]); // Dependência no 'timeWindow' faz o efeito reexecutar quando o período de tempo muda

  // Função para fechar o pop-up de boas-vindas ao clicar no ícone de fechar
  const closePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <Container maxW={"container.xl"}>
      {/* Pop-up de boas-vindas */}
      {isPopupVisible && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0, 0, 0, 0.4)" // Fundo escurecido para destacar o pop-up
          display="flex"
          justifyContent="center"
          alignItems="center"
          zIndex="1000" // Define o pop-up no topo da camada de exibição
        >
          <Box
            bg="gray.900"
            p="9"
            rounded="md"
            boxShadow="lg"
            position="relative"
            maxWidth="480px"
            textAlign="center"
            borderColor="red.500"
            borderWidth="3px"
          >
            {/* Botão para fechar o pop-up */}
            <IconButton
              icon={<CloseIcon />}
              position="absolute"
              top="2"
              right="2"
              onClick={closePopup} // Chama a função closePopup ao clicar
              size="sm"
              aria-label="Fechar pop-up"
              bg="gray.700"
              _hover={{ bg: "red.500" }}
            />
            {/* Título e descrição do pop-up */}
            <Heading as="h1" size="lg" mb="4" color="white.600">
             🎥 Bem-vindo ao Nextlab
            </Heading>
            <Text color="white.700">
              Explore e busque seus filmes favoritos,<br />
              
              descubra o que está em alta e monte uma lista personalizada de filmes assistidos.<br /> 
              <br></br>
              Compartilhe suas opiniões: escreva sua resenha e avalie cada título com a sua perspectiva.<br />
              <br></br>
              Nossa plataforma foi feita para os apaixonados por cinema que querem registrar tudo que assistem.
              Prepare a pipoca e boa diversão!
            </Text>
          </Box>
        </Box>
      )}

      {/* Seção de título e filtro de tempo para exibir as tendências */}
      <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Tendência
        </Heading>
        {/* Botões para escolher entre 'Hoje' e 'Nessa Semana' */}
        <Flex
          alignItems={"center"}
          gap={"2"}
          border={"1px solid red"}
          borderRadius={"20px"}
        >
          <Box
            as="button"
            px="3"
            py="1"
            borderRadius={"20px"}
            bg={`${timeWindow === "day" ? "red.600" : "gray.200"}`} // Define cor de fundo para 'Hoje' selecionado
            color={`${timeWindow === "day" ? "white" : "gray.700"}`}
            onClick={() => setTimeWindow("day")} // Atualiza o período para 'day' ao clicar
          >
            Hoje
          </Box>
          <Box
            as="button"
            px="3"
            py="1"
            borderRadius={"20px"}
            bg={`${timeWindow === "week" ? "red.600" : "gray.200"}`} // Define cor de fundo para 'Nessa Semana' selecionado
            color={`${timeWindow === "week" ? "white" : "gray.700"}`}
            onClick={() => setTimeWindow("week")} // Atualiza o período para 'week' ao clicar
          >
            Nessa Semana
          </Box>
        </Flex>
      </Flex>

      {/* Grid de exibição dos filmes/séries em tendência */}
      <Grid
        templateColumns={{
          base: "1fr", // Coluna única para telas pequenas
          sm: "repeat(2, 1fr)", // Duas colunas para telas médias
          md: "repeat(4, 1fr)", // Quatro colunas para telas maiores
          lg: "repeat(5, 1fr)", // Cinco colunas para telas grandes
        }}
        gap={"4"} // Espaço entre os itens do grid
      >
        {data &&
          data.map((item, i) =>
            loading ? (
              // Exibe um Skeleton (efeito de carregamento) enquanto dados são carregados
              <Skeleton height={300} key={i} />
            ) : (
              // Renderiza o componente CardComponent para cada item do array de dados
              <CardComponent
                key={item?.id} // Atribui chave única baseada no ID do item
                item={item} // Passa os dados do item para o CardComponent
                type={item?.media_type} // Define o tipo de mídia (filme ou série)
              />
            )
          )}
      </Grid>
    </Container>
  );
};

export default Home;