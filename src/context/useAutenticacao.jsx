import { useContext } from "react";
// Importa `useContext` do React, um hook que permite acessar valores de um contexto

import { AutenticacaoContext } from "./AutenticacaoProvider";
// Importa `AutenticacaoContext`, que é o contexto de autenticação fornecido pelo componente `AutenticacaoProvider`

export const useAuth = () => useContext(AutenticacaoContext);
// Define um hook personalizado `useAuth` que retorna o valor do `AutenticacaoContext`
// Isso simplifica o acesso aos dados de autenticação em outros componentes da aplicação, 
// permitindo que apenas `useAuth()` seja chamado em vez de `useContext(AutenticacaoContext)`
