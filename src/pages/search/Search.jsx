import { useEffect, useState } from "react";
// Importa os hooks `useEffect` e `useState` do React para gerenciar o estado e executar efeitos colaterais.

import {
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  Skeleton,
  Spinner,
} from "@chakra-ui/react";
// Importa os componentes do Chakra UI para construir a interface com design responsivo e acessível.

import { searchData } from "../../services/api";
// Importa a função `searchData` que realiza a requisição à API para buscar filmes ou séries com base em um termo de pesquisa.

import CardComponent from "../../components/CardComponent";
// Importa o componente `CardComponent` para exibir os filmes ou séries em formato de cartão.

import PaginationComponent from "../../components/PaginationComponent";
// Importa o componente `PaginationComponent` para navegar entre as páginas de resultados da pesquisa.

const Search = () => {
  // Define o componente funcional `Search`.

  const [searchValue, setSearchValue] = useState("");
  // Estado que armazena o valor da pesquisa final, que será usado para fazer a requisição à API.

  const [tempSearchValue, setTempSearchValue] = useState("");
  // Estado temporário que armazena o valor da pesquisa enquanto o usuário digita, antes de confirmá-la.

  const [activePage, setActivePage] = useState(1);
  // Estado que armazena a página ativa da pesquisa, utilizado para navegar pelos resultados.

  const [totalPages, setTotalPages] = useState(1);
  // Estado que armazena o número total de páginas de resultados para a pesquisa.

  const [isLoading, setIsLoading] = useState(false);
  // Estado que indica se os dados estão sendo carregados da API.

  const [data, setData] = useState([]);
  // Estado que armazena os resultados da pesquisa, como filmes ou séries.

  useEffect(() => {
    // O `useEffect` é chamado sempre que `searchValue` ou `activePage` muda.

    setIsLoading(true);
    // Define o estado `isLoading` como `true` enquanto a requisição está em andamento.

    searchData(searchValue, activePage)
      .then((res) => {
        // Quando a requisição à API for bem-sucedida, define os estados com os resultados.

        console.log(res, "res");
        // Log dos resultados da requisição para depuração.

        setData(res?.results);
        // Armazena os filmes ou séries retornados pela API no estado `data`.

        setActivePage(res?.page);
        // Atualiza o estado `activePage` com o número da página atual retornada pela API.

        setTotalPages(res?.total_pages);
        // Atualiza o estado `totalPages` com o número total de páginas de resultados.
      })
      .catch((err) => console.log(err, "err"))
      // Em caso de erro, exibe o erro no console.

      .finally(() => setIsLoading(false));
      // Após a requisição, define o estado `isLoading` como `false`, indicando que a requisição foi concluída.
  }, [searchValue, activePage]);
  // O `useEffect` depende de `searchValue` e `activePage`, então é executado sempre que um desses valores muda.

  const handleSearch = (e) => {
    // Função chamada quando o formulário é enviado (quando o usuário confirma a pesquisa).

    e.preventDefault();
    // Impede o comportamento padrão de envio de formulário (que recarregaria a página).

    setSearchValue(tempSearchValue);
    // Atualiza o estado `searchValue` com o valor temporário `tempSearchValue` para iniciar a pesquisa.
  };

  return (
    <Container maxW={"container.xl"}>
      {/* Contêiner principal que envolve todo o conteúdo com largura máxima configurada para `container.xl`. */}

      <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
        {/* Flexbox para alinhar os itens horizontalmente. */}
        
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Buscar Filmes
        </Heading>
        {/* Cabeçalho da página com título "Buscar Filmes", estilizado para ficar em maiúsculas. */}
      </Flex>

      <form onSubmit={handleSearch}>
        {/* Formulário que envia a pesquisa ao usuário pressionar Enter ou ao clicar no botão de pesquisa. */}
        
        <Input
          placeholder="Procure por Filmes, Series..."
          _placeholder={{ color: "gray.100" }}
          value={tempSearchValue}
          onChange={(e) => setTempSearchValue(e.target.value)}
        />
        {/* Campo de input para o usuário digitar o termo de pesquisa. O valor é controlado pelo estado `tempSearchValue`, 
            e a função `onChange` atualiza esse estado conforme o usuário digita. */}
      </form>

      {isLoading && (
        // Exibe um spinner enquanto os dados estão sendo carregados.
        <Flex justifyContent={"center"} mt="10">
          <Spinner size={"xl"} color="red" />
        </Flex>
      )}

      {data?.length === 0 && !isLoading && (
        // Exibe uma mensagem caso não haja resultados encontrados e o carregamento tenha sido concluído.
        <Heading textAlign={"center"} as="h3" fontSize={"sm"} mt="10">
          Nenhum resultado encontrado 😥
        </Heading>
      )}

      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={"4"}
        mt="6"
      >
        {/* Grid que organiza os filmes ou séries em uma grade responsiva, dependendo do tamanho da tela. */}

        {data?.length > 0 &&
          !isLoading &&
          data?.map((item, i) =>
            isLoading ? (
              // Se estiver carregando, exibe um Skeleton (uma versão em branco) como placeholder.
              <Skeleton height={300} key={i} />
            ) : (
              <CardComponent
                key={item?.id}
                item={item}
                type={item?.media_type}
              />
              // Exibe um componente `CardComponent` para cada item de filme ou série, passando as informações como `item` e `type`.
            )
          )}
      </Grid>

      {data?.length > 0 && !isLoading && (
        // Exibe a navegação da página apenas se houver dados para mostrar e o carregamento for concluído.
        <PaginationComponent
          activePage={activePage}
          totalPages={totalPages}
          setActivePage={setActivePage}
        />
      )}
    </Container>
  );
};

export default Search;