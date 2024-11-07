import axios from "axios"; // Importa a biblioteca axios para realizar requisições HTTP.

// Definindo os caminhos base para as imagens, tanto para imagens em tamanho padrão quanto em tamanho original.
export const imagePath = "https://image.tmdb.org/t/p/w500"; // Caminho para imagens de tamanho médio.
export const imagePathOriginal = "https://image.tmdb.org/t/p/original"; // Caminho para imagens em tamanho original.

const baseUrl = "https://api.themoviedb.org/3"; // URL base da API do TMDB.
const apiKey = import.meta.env.VITE_API_KEY; // A chave da API, que é carregada a partir das variáveis de ambiente.

// Função para buscar os itens em alta (trending) na API do TMDB.
export const fetchTrending = async (timeWindow = "day") => {
  // Faz uma requisição GET para a API do TMDB para buscar os itens em alta no período especificado (por padrão, 'day').
  const { data } = await axios.get(
    `${baseUrl}/trending/all/${timeWindow}?api_key=${apiKey}&language=pt-BR`
  );
  
  // Retorna os resultados da requisição (os itens em alta).
  return data?.results;
};

// Função para buscar os detalhes de um filme ou série.
export const fetchDetails = async (type, id) => {
  // Faz uma requisição GET para buscar os detalhes de um filme ou série usando o 'type' (filme ou série) e o 'id' específico.
  const res = await axios.get(
    `${baseUrl}/${type}/${id}?api_key=${apiKey}&language=pt-BR`
  );
  
  // Retorna os dados de detalhes (como título, descrição, etc.).
  return res?.data;
};

// Função para buscar os créditos de um filme ou série (quem participou da produção).
export const fetchCredits = async (type, id) => {
  // Faz uma requisição GET para buscar os créditos (atores, diretores, etc.) de um filme ou série.
  const res = await axios.get(
    `${baseUrl}/${type}/${id}/credits?api_key=${apiKey}&language=pt-BR`
  );
  
  // Retorna os dados dos créditos.
  return res?.data;
};

// Função para buscar os vídeos de um filme ou série (como trailers).
export const fetchVideos = async (type, id) => {
  // Faz uma requisição GET para buscar os vídeos (como trailers) de um filme ou série.
  const res = await axios.get(
    `${baseUrl}/${type}/${id}/videos?api_key=${apiKey}&language=pt-BR`
  );
  
  // Retorna os dados dos vídeos.
  return res?.data;
};

// Função para buscar filmes, com paginação e ordenação dos resultados.
export const fetchMovies = async (page, sortBy) => {
  // Faz uma requisição GET para buscar filmes, permitindo a paginação e ordenação dos resultados.
  const res = await axios.get(
    `${baseUrl}/discover/movie?api_key=${apiKey}&page=${page}&sort_by=${sortBy}&language=pt-BR`
  );
  
  // Retorna os dados dos filmes encontrados.
  return res?.data;
};

// Função para buscar séries de TV, com paginação e ordenação dos resultados.
export const fetchTvSeries = async (page, sortBy) => {
  // Faz uma requisição GET para buscar séries de TV, permitindo a paginação e ordenação dos resultados.
  const res = await axios.get(
    `${baseUrl}/discover/tv?api_key=${apiKey}&page=${page}&sort_by=${sortBy}&language=pt-BR`
  );
  
  // Retorna os dados das séries de TV encontradas.
  return res?.data;
};

// Função para buscar dados com base em uma consulta de pesquisa (por exemplo, buscar filmes, séries ou pessoas).
export const searchData = async (query, page) => {
  // Faz uma requisição GET para a API de busca, usando a consulta de pesquisa e a paginação.
  const res = await axios.get(
    `${baseUrl}/search/multi?api_key=${apiKey}&query=${query}&page=${page}&language=pt-BR`
  );
  
  // Retorna os resultados da pesquisa (podem ser filmes, séries ou outros tipos de mídia).
  return res?.data;
};