import { Navigate } from "react-router-dom";
// Importa `Navigate` para redirecionar o usuário caso ele não esteja autenticado

import { useAuth } from "../../context/useAuth";
// Importa o hook personalizado `useAuth` para obter informações de autenticação

import PropTypes from "prop-types";
// Importa `PropTypes` para validação das props recebidas

const Protected = ({ children }) => {
  // Declara o componente `Protected` que recebe `children` como prop.
  // `children` representa os elementos que serão renderizados se o usuário estiver autenticado.

  const { user, isLoading } = useAuth();
  // Desestrutura `user` e `isLoading` do hook `useAuth`.
  // `user` indica o usuário autenticado (ou `null` se não houver), e `isLoading` indica se a autenticação ainda está em andamento.

  if (isLoading) {
    return null;
    // Se `isLoading` for `true`, retorna `null`, ou seja, nada é renderizado enquanto o estado de autenticação é carregado.
  }

  return <>{user ? children : <Navigate to={"/"} />}</>;
  // Se `user` existir (usuário autenticado), renderiza `children` (conteúdo protegido).
  // Caso contrário, redireciona o usuário para a página inicial usando `Navigate`.
};

Protected.propTypes = {
  children: PropTypes.node.isRequired,
  // Valida que `children` é um nó React obrigatório
};

export default Protected;
// Exporta o componente `Protected` para uso em outras partes da aplicação
