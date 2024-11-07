import { useContext } from "react";
// Importa o hook `useContext` do React, que permite acessar os valores armazenados em um contexto.

import { AuthContext } from "./authProvider";
// Importa o contexto `AuthContext` do arquivo `authProvider`, que contém o estado de autenticação do usuário.

export const useAuth = () => useContext(AuthContext);
// Define um hook personalizado chamado `useAuth` que utiliza o `useContext` para acessar o valor do `AuthContext`.
// Esse hook facilita o acesso aos dados de autenticação (como o usuário autenticado, o estado de carregamento, etc.)
// em qualquer componente que precise dessas informações, sem a necessidade de passar props manualmente.