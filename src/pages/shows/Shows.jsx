import {
  Container,
  Flex,
  Grid,
  Heading,
  Select,
  Skeleton,
} from "@chakra-ui/react";
// Importa os componentes do Chakra UI necessários para construir a interface de usuário responsiva e estilizada.

import { useEffect, useState } from "react";
// Importa os hooks `useEffect` e `useState` do React para gerenciar o estado e executar efeitos colaterais.

import { fetchTvSeries } from "../../services/api";
// Importa a função `fetchTvSeries` que busca os dados das séries de TV da API.

import CardComponent from "../../components/CardComponent";
// Importa o componente `CardComponent` para exibir cada série de TV em um cartão estilizado.

import PaginationComponent from "../../components/PaginationComponent";
// Importa o componente `PaginationComponent` para controlar a navegação pelas páginas de resultados.

const Shows = () => {
  // Define o componente funcional `Shows`.

  const [shows, setShows] = useState([]);
  // Estado para armazenar a lista de séries de TV recebidas da API.

  const [activePage, setActivePage] = useState(1);
  // Estado para controlar a página atual da pesquisa.

  const [totalPages, setTotalPages] = useState(1);
  // Estado para armazenar o número total de páginas de resultados.

  const [sortBy, setSortBy] = useState("popularity.desc");
  // Estado para armazenar o critério de ordenação das séries. Inicialmente, as séries são ordenadas por popularidade.

  const [isLoading, setIsLoading] = useState(true);
  // Estado que indica se os dados estão sendo carregados (usado para mostrar a tela de carregamento).

  useEffect(() => {
    // `useEffect` é chamado sempre que `activePage` ou `sortBy` são alterados, para buscar novos dados.

    setIsLoading(true);
    // Marca que os dados estão sendo carregados ao iniciar a requisição.

    fetchTvSeries(activePage, sortBy)
      .then((res) => {
        // Quando a requisição à API for bem-sucedida, processa os dados.

        console.log(res, "res");
        // Log dos resultados da requisição para depuração.

        setShows(res?.results);
        // Atualiza o estado `shows` com os resultados das séries de TV retornadas pela API.

        setActivePage(res?.page);
        // Atualiza a página ativa com o número da página atual.

        setTotalPages(res?.total_pages);
        // Atualiza o total de páginas com o número total de páginas retornadas pela API.
      })
      .catch((err) => console.log(err, "err"))
      // Caso ocorra algum erro na requisição, o erro é logado no console.

      .finally(() => setIsLoading(false));
      // Define o estado `isLoading` como `false`, indicando que o carregamento foi concluído.
  }, [activePage, sortBy]);
  // O `useEffect` depende dos estados `activePage` e `sortBy`, ou seja, a requisição será refeita sempre que esses valores mudarem.

  return (
    <Container maxW={"container.xl"}>
      {/* Contêiner principal que contém todo o conteúdo, com largura máxima definida como `container.xl`. */}

      <Flex alignItems={"baseline"} gap={"4"} my="10">
        {/* Flexbox para alinhar os itens horizontalmente e controlar o layout da parte superior da página. */}
        
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Descubra as Séries
        </Heading>
        {/* Cabeçalho da página com título "Descubra as Séries", estilizado para aparecer em maiúsculas. */}
        
        <Select
          w={"130px"}
          onChange={(e) => {
            // Ação para mudar o critério de ordenação das séries.
            setActivePage(1);
            // Reseta a página ativa para 1 toda vez que a ordenação mudar.
            setSortBy(e.target.value);
            // Atualiza o critério de ordenação com o valor selecionado no `Select`.
          }}
        >
          <option value="popularity.desc">Populares</option>
          <option value="vote_average.desc&vote_count.gte=1000">
            Melhores Avaliações
          </option>
          {/* As opções de ordenação disponíveis para o usuário: por popularidade ou por melhores avaliações. */}
        </Select>
      </Flex>

      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={"4"}
      >
        {/* Grid que organiza os filmes em uma estrutura responsiva com base no tamanho da tela.
            O número de colunas varia conforme o tamanho da tela: 1 coluna para telas pequenas, 2 para telas pequenas maiores, 
            4 para telas médias e 5 para telas grandes. */}
        
        {shows &&
          shows?.map((item, i) =>
            // Mapeia a lista de séries e renderiza um componente `CardComponent` para cada série.

            isLoading ? (
              // Enquanto os dados estão sendo carregados, exibe um `Skeleton` (efeito de carregamento).
              <Skeleton height={300} key={i} />
            ) : (
              <CardComponent key={item?.id} item={item} type={"tv"} />
              // Quando os dados são carregados, exibe o componente `CardComponent` com as informações da série de TV.
            )
          )}
      </Grid>

      <PaginationComponent
        activePage={activePage}
        totalPages={totalPages}
        setActivePage={setActivePage}
      />
      {/* Componente de paginação que permite navegar pelas páginas de resultados. 
          Ele recebe a página atual, o número total de páginas e a função para atualizar a página ativa. */}
    </Container>
  );
};

export default Shows;