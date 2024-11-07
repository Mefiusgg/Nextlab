import { useState, useEffect } from "react"; // Importa hooks do React para gerenciar estados e efeitos colaterais.
import { useFirestore } from "../services/firestore"; // Importa o serviço do Firestore para interagir com o banco de dados.
import { useAuth } from "../context/useAuth"; // Importa o hook de contexto para pegar informações sobre o usuário autenticado.
import { Container, Flex, Grid, Heading, Spinner } from "@chakra-ui/react"; // Importa componentes de layout e UI do Chakra UI.
import WatchlistCard from "../components/WatchlistCard"; // Importa o componente que exibe cada item da lista de assistidos.

const Watchlist = () => {
  const { getWatchlist } = useFirestore(); // Desestrutura a função getWatchlist do serviço do Firestore para obter os itens da lista de assistidos.
  const { user } = useAuth(); // Desestrutura o objeto user do contexto de autenticação para saber quem está logado.
  
  // Definição dos estados para controlar os dados da watchlist e o estado de carregamento.
  const [watchlist, setWatchlist] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 

  // useEffect é utilizado para buscar os dados da watchlist do usuário sempre que o UID do usuário mudar.
  useEffect(() => {
    if (user?.uid) { // Verifica se o usuário está logado (se tem um UID).
      getWatchlist(user?.uid) // Chama a função getWatchlist passando o UID do usuário para pegar os dados da watchlist.
        .then((data) => {
          setWatchlist(data); // Armazena os dados recebidos na variável 'watchlist'.
          console.log(data, "data"); // Exibe os dados no console para debug (opcional).
        })
        .catch((err) => {
          console.log(err, "error"); // Se ocorrer um erro ao buscar os dados, exibe o erro no console.
        })
        .finally(() => {
          setIsLoading(false); // Após a busca ser concluída (independente de sucesso ou falha), define 'isLoading' como false.
        });
    }
  }, [user?.uid, getWatchlist]); // O efeito é executado sempre que o UID do usuário ou a função 'getWatchlist' mudarem.

  return (
    <Container maxW={"container.xl"}> {/* Container para limitar a largura do conteúdo. */}
      <Flex alignItems={"baseline"} gap={"4"} my={"10"}> {/* Flexbox para título e layout geral. */}
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}> {/* Título "Lista de Assistidos" */}
          Lista de Assistidos
        </Heading>
      </Flex>

      {/* Exibe o Spinner enquanto os dados estão sendo carregados. */}
      {isLoading && (
        <Flex justify={"center"} mt="10">
          <Spinner size={"xl"} color="red" />
        </Flex>
      )}

      {/* Se a lista estiver carregada e estiver vazia, exibe uma mensagem informando que está vazia. */}
      {!isLoading && watchlist?.length === 0 && (
        <Flex justify={"center"} mt="10">
          <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
            Lista de assistidos vazia 😥
          </Heading>
        </Flex>
      )}

      {/* Se a lista não estiver vazia, exibe os itens da watchlist. */}
      {!isLoading && watchlist?.length > 0 && (
        <Grid
          templateColumns={{
            base: "1fr", // Exibe uma coluna para telas pequenas.
          }}
          gap={"4"} // Espaçamento entre os itens.
        >
          {watchlist?.map((item) => ( // Itera sobre os itens da watchlist e exibe um componente WatchlistCard para cada item.
            <WatchlistCard
              key={item?.id} // Chave única para cada item da lista (baseada no ID).
              item={item} // Passa os dados do item para o componente WatchlistCard.
              type={item?.type} // Passa o tipo do item (se é filme ou série).
              setWatchlist={setWatchlist} // Passa a função setWatchlist para permitir alterações na lista.
            />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Watchlist;