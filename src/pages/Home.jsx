import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Skeleton,
} from "@chakra-ui/react"; // Importa componentes da biblioteca Chakra UI para a interface.
import { fetchTrending } from "../services/api"; // Função para buscar filmes/séries em tendência (do serviço da API).
import CardComponent from "../components/CardComponent"; // Componente para exibir informações de cada filme/série em formato de cartão.

const Home = () => {
  const [data, setData] = useState([]); // Estado para armazenar os dados de filmes/séries em tendência.
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento da página.
  const [timeWindow, setTimeWindow] = useState("day"); // Estado para controlar o filtro de tendência: 'day' (hoje) ou 'week' (essa semana).

  // Efeito para buscar os dados assim que o componente for montado ou quando o filtro timeWindow mudar.
  useEffect(() => {
    setLoading(true); // Define o estado de carregamento como true quando começa a busca.
    fetchTrending(timeWindow) // Chama a função fetchTrending passando o parâmetro timeWindow (dia ou semana).
      .then((res) => {
        setData(res); // Armazena os dados recebidos da API no estado 'data'.
      })
      .catch((err) => {
        console.log(err, "err"); // Em caso de erro, imprime no console.
      })
      .finally(() => {
        setLoading(false); // Após o carregamento ser concluído (sucesso ou falha), define o estado de carregamento como false.
      });
  }, [timeWindow]); // O efeito é executado sempre que 'timeWindow' mudar.

  console.log(data, "data"); // Exibe os dados no console para debug (opcional).

  return (
    <Container maxW={"container.xl"}> {/* Container para limitar a largura do conteúdo. */}
      <Flex alignItems={"baseline"} gap={"4"} my={"10"}> {/* Flexbox para o título e os botões de filtro. */}
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}> {/* Título "Tendência" */}
          Tendência
        </Heading>
        <Flex
          alignItems={"center"}
          gap={"2"}
          border={"1px solid teal"}
          borderRadius={"20px"}
        >
          {/* Botões de filtro para escolher entre 'Hoje' e 'Nessa Semana' */}
          <Box
            as="button"
            px="3"
            py="1"
            borderRadius={"20px"}
            bg={`${timeWindow === "day" ? "gray.800" : ""}`} // Aplica o fundo cinza se 'timeWindow' for 'day'.
            onClick={() => setTimeWindow("day")} // Muda o filtro para 'day' quando clicado.
          >
            Hoje
          </Box>
          <Box
            as="button"
            px="3"
            py="1"
            borderRadius={"20px"}
            bg={`${timeWindow === "week" ? "gray.800" : ""}`} // Aplica o fundo cinza se 'timeWindow' for 'week'.
            onClick={() => setTimeWindow("week")} // Muda o filtro para 'week' quando clicado.
          >
            Nessa Semana
          </Box>
        </Flex>
      </Flex>
      
      {/* Grid que exibe os filmes/séries em tendência. Cada coluna é adaptável conforme a largura da tela. */}
      <Grid
        templateColumns={{
          base: "1fr", // Para telas pequenas (base), exibe uma coluna.
          sm: "repeat(2, 1fr)", // Para telas pequenas médias (sm), exibe duas colunas.
          md: "repeat(4, 1fr)", // Para telas médias (md), exibe quatro colunas.
          lg: "repeat(5, 1fr)", // Para telas grandes (lg), exibe cinco colunas.
        }}
        gap={"4"} // Espaçamento entre os itens do grid.
      >
        {data && // Verifica se há dados para exibir.
          data?.map((item, i) =>
            loading ? ( // Se os dados ainda estão sendo carregados, exibe um Skeleton (carregamento visual).
              <Skeleton height={300} key={i} /> // Skeleton de altura 300px para simular o carregamento do item.
            ) : (
              // Quando os dados estiverem prontos, exibe o CardComponent para cada item.
              <CardComponent
                key={item?.id} // A chave única para cada item (baseada no ID).
                item={item} // Passa os dados do item para o componente Card.
                type={item?.media_type} // Passa o tipo de mídia (filme ou série).
              />
            )
          )}
      </Grid>
    </Container>
  );
};

export default Home;