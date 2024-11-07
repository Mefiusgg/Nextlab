import { createContext, useEffect, useState } from "react";
// Importa `createContext`, `useEffect` e `useState` do React para criar o contexto de autenticação e gerenciar o estado

import { auth } from "../services/firebase";
// Importa a instância de autenticação do Firebase configurada

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
// Importa funções específicas do Firebase para autenticação com Google, monitoramento de estado de autenticação e logout

import PropTypes from "prop-types";
// Importa `PropTypes` para validação das props recebidas

export const AuthContext = createContext();
// Cria o contexto de autenticação, que será usado para fornecer e acessar o estado de autenticação em toda a aplicação

export const AuthProvider = ({ children }) => {
  // Declara o componente `AuthProvider` que receberá `children` como prop para renderizar componentes filhos

  const [user, setUser] = useState(null);
  // Estado `user` para armazenar o usuário autenticado; inicialmente, é `null`

  const [isLoading, setIsLoading] = useState(true);
  // Estado `isLoading` para indicar se o estado de autenticação está sendo carregado; inicialmente, é `true`

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    // Cria uma nova instância do provedor de autenticação do Google
    return signInWithPopup(auth, provider);
    // Abre um popup para autenticação com Google e retorna a promessa
  }

  function logout() {
    return signOut(auth);
    // Realiza logout do usuário e retorna a promessa
  }

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      // Define um observador para monitorar mudanças no estado de autenticação do Firebase
      if (currentUser) {
        setUser(currentUser);
        // Se `currentUser` existir, atualiza o estado `user` com o usuário autenticado
      } else {
        setUser(null);
        // Caso contrário, define `user` como `null` (nenhum usuário autenticado)
      }
      setIsLoading(false);
      // Define `isLoading` como `false` após a verificação inicial
    });
  }, []);
  // Executa o efeito apenas uma vez na montagem do componente

  return (
    <AuthContext.Provider value={{ user, isLoading, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
    // Provedor de contexto que disponibiliza `user`, `isLoading`, `signInWithGoogle` e `logout` para componentes filhos
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
  // Valida que `children` é um nó React obrigatório
};

export default AuthProvider;
// Exporta o componente `AuthProvider` para ser usado em outras partes da aplicação
