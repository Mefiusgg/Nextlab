import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom"; // Importa as funcionalidades para gerenciar rotas
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"; // Importa Chakra UI para estilização e gerenciamento de tema
import App from "./App.jsx"; // Componente principal da aplicação
import "./index.css"; // Importa o arquivo de estilos CSS global
import theme from "../theme.js"; // Importa o tema personalizado do Chakra UI
import Home from "./pages/Home.jsx"; // Página inicial da aplicação
import Movies from "./pages/movies/Movies.jsx"; // Página de filmes
import Shows from "./pages/shows/Shows.jsx"; // Página de séries
import Search from "./pages/search/Search.jsx"; // Página de pesquisa
import DetailsPage from "./pages/DetailsPage.jsx"; // Página de detalhes de filmes/séries
import { AuthProvider } from "./context/authProvider.jsx"; // Contexto de autenticação
import Watchlist from "./pages/Watchlist.jsx"; // Página de lista de assistidos
import Protected from "./components/routes/Protected.jsx"; // Componente para proteger rotas que exigem autenticação

// Configuração das rotas do React Router
const router = createBrowserRouter([
  {
    path: "/", // Rota raiz
    element: <App />, // Componente principal da aplicação
    children: [
      {
        path: "/", // Página inicial
        element: <Home />, // Exibe o componente Home na rota raiz
      },
      {
        path: "/movies", // Rota para filmes
        element: <Movies />, // Exibe o componente Movies
      },
      {
        path: "/shows", // Rota para séries
        element: <Shows />, // Exibe o componente Shows
      },
      {
        path: "/search", // Rota para busca
        element: <Search />, // Exibe o componente Search
      },
      {
        path: "/:type/:id", // Rota dinâmica para detalhes de filmes ou séries, usando parâmetros
        element: <DetailsPage />, // Exibe a página de detalhes
      },
      {
        path: "/watchlist", // Rota para lista de assistidos
        element: (
          <Protected> {/* Protege a rota, só acessível se autenticado */}
            <Watchlist /> {/* Exibe o componente Watchlist */}
          </Protected>
        ),
      },
    ],
  },
]);

// Renderiza a aplicação no DOM
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode> {/* Ativa o modo estrito do React para identificar problemas durante o desenvolvimento */}
    <ColorModeScript initialColorMode={theme.config.initialColorMode} /> {/* Define o modo de cor inicial com base no tema */}
    <ChakraProvider theme={theme}> {/* Envolve a aplicação com o ChakraProvider e o tema personalizado */}
      <AuthProvider> {/* Envolve a aplicação com o contexto de autenticação */}
        <RouterProvider router={router} /> {/* Fornece o roteador para a aplicação */}
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);