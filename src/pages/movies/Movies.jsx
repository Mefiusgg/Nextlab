import {
  Container,
  Flex,
  Grid,
  Heading,
  Select,
  Skeleton,
} from "@chakra-ui/react";
// Importa componentes da biblioteca Chakra UI para construir a interface do usuário de maneira rápida e responsiva.

import { useEffect, useState } from "react";
// Importa os hooks `useEffect` e `useState` do React. `useState` é usado para gerenciar o estado, e `useEffect` para executar efeitos colaterais (como chamadas à API).

import { fetchMovies } from "../../services/api";
// Importa a função `fetchMovies` que realiza a requisição à API para buscar filmes.

import CardComponent from "../../components/CardComponent";
// Importa o componente `CardComponent`, que será usado para exibir cada filme na lista.

import PaginationComponent from "../../components/PaginationComponent";
// Importa o componente `PaginationComponent` para permitir a navegação entre as páginas de resultados de filmes.

const Movies = () => {
  // Declaração do componente `Movies`.

  const [movies, setMovies] = useState([]); 
  // Estado para armazenar os filmes que serão exibidos.
  
  const [activePage, setActivePage] = useState(1); 
  // Estado para armazenar a página ativa da listagem de filmes.
  
  const [totalPages, setTotalPages] = useState(1); 
  // Estado para armazenar o total de páginas de filmes disponíveis na API.

  const [sortBy, setSortBy] = useState("popularity.desc"); 
  // Estado para armazenar o critério de ordenação dos filmes.

  const [isLoading, setIsLoading] = useState(true); 
  // Estado para controlar o carregamento enquanto os filmes estão sendo buscados da API.

  useEffect(() => {
    // Hook `useEffect` que é chamado sempre que `activePage` ou `sortBy` mudam.

    setIsLoading(true); 
    // Define o estado `isLoading` como `true` para indicar que os filmes estão sendo carregados.

    fetchMovies(activePage, sortBy)
      .then((res) => {
        // Realiza a chamada à função `fetchMovies` passando a página ativa e o critério de ordenação.

        console.log(res, "res"); 
        // Log dos resultados da API para depuração.

        setMovies(res?.results); 
        // Armazena os filmes retornados pela API no estado `movies`.

        setActivePage(res?.page); 
        // Atualiza o estado `activePage` com a página atual retornada pela API.

        setTotalPages(res?.total_pages); 
        // Atualiza o estado `totalPages` com o número total de páginas retornado pela API.
      })
      .catch((err) => console.log(err, "err")) 
      // Captura qualquer erro ocorrido durante a chamada à API e exibe no console.

      .finally(() => setIsLoading(false)); 
      // Após a requisição, define o estado `isLoading` como `false` indicando que o carregamento foi finalizado.
  }, [activePage, sortBy]); 
  // O efeito depende de `activePage` e `sortBy`, então será reexecutado sempre que esses valores mudarem.

  return (
    <Container maxW={"container.xl"}>
      {/* Contêiner principal que envolve o conteúdo, com largura máxima configurada para `container.xl`. */}

      <Flex alignItems={"baseline"} gap={"4"} my="10">
        {/* Componente Flex para organizar os elementos de forma flexível. */}
        
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Descubra os Filmes
        </Heading>
        {/* Título da página de filmes, com estilo para maiúsculas e fonte de tamanho médio. */}

        <Select
          w={"130px"} 
          onChange={(e) => {
            setActivePage(1); 
            // Reseta para a primeira página quando o critério de ordenação muda.

            setSortBy(e.target.value); 
            // Atualiza o estado `sortBy` com o novo valor do critério de ordenação.
          }}
        >
          <option value="popularity.desc">Populares</option>
          <option value="vote_average.desc&vote_count.gte=1000">Melhores Notas</option>
          {/* Opções de ordenação: por popularidade e por melhor avaliação */}
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
        {/* Componente Grid que organiza os filmes em diferentes layouts dependendo da largura da tela. */}

        {movies &&
          movies?.map((item, i) =>
            isLoading ? (
              <Skeleton height={300} key={i} /> 
              // Exibe um Skeleton enquanto os filmes estão sendo carregados.
            ) : (
              <CardComponent key={item?.id} item={item} type={"movie"} />
              // Exibe um componente `CardComponent` para cada filme, passando `item` como o filme e `type="movie"`.
            )
          )}
      </Grid>

      <PaginationComponent
        activePage={activePage} 
        totalPages={totalPages} 
        setActivePage={setActivePage} 
      />
      {/* Exibe o componente de paginação, permitindo que o usuário navegue entre as páginas de resultados de filmes. */}
    </Container>
  );
};

export default Movies;