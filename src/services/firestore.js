// Importa os métodos necessários do Firestore para manipulação de dados.
import { db } from "../services/firebase";
import {
  addDoc, // Função para adicionar um novo documento à coleção.
  collection, // Função para referenciar uma coleção do Firestore.
  deleteDoc, // Função para excluir um documento.
  doc, // Função para referenciar um documento específico.
  getDoc, // Função para obter um único documento.
  getDocs, // Função para obter múltiplos documentos.
  setDoc, // Função para definir ou atualizar um documento.
} from "firebase/firestore";

// Importa o hook do Chakra UI para exibir notificações (toast).
import { useToast } from "@chakra-ui/react";
// Importa useCallback para otimizar funções que dependem de dependências constantes.
import { useCallback } from "react";

// Hook customizado para interagir com o Firestore, incluindo funções para manipulação de documentos.
export const useFirestore = () => {
  const toast = useToast(); // Hook para criar e mostrar notificações.

  // Função para adicionar um novo documento a uma coleção.
  const addDocument = async (collectionName, data) => {
    // Adiciona um novo documento à coleção especificada.
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id); // Log do ID do documento adicionado.
  };

  // Função para adicionar um comentário a um filme.
  const addComment = async (movieId, comment) => {
    try {
      // Adiciona o comentário à subcoleção "comments" dentro de um documento de filme.
      await addDoc(collection(db, "movies", movieId, "comments"), comment);
      toast({
        title: "Success!", // Exibe uma notificação de sucesso.
        description: "Comment added successfully.",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.log(error, "Error adding comment"); // Log de erro, se houver.
      toast({
        title: "Error!", // Exibe uma notificação de erro.
        description: "An error occurred while adding the comment.",
        status: "error",
        isClosable: true,
      });
    }
  };

  // Função para recuperar os comentários de um filme específico.
  const getComments = useCallback(async (movieId) => {
    const commentsRef = collection(db, "movies", movieId, "comments"); // Referência para a coleção de comentários.
    const q = query(commentsRef, orderBy("date")); // Consulta os comentários, ordenados pela data.
    const querySnapshot = await getDocs(q); // Executa a consulta.
    const comments = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Mapeia os dados dos comentários.
      ...doc.data(),
    }));
    return comments; // Retorna os comentários recuperados.
  }, []); // O useCallback evita que a função seja recriada em cada renderização.

  // Função para adicionar um item à lista de assistidos de um usuário.
  const addToWatchlist = async (userId, dataId, data) => {
    try {
      // Verifica se o item já está na lista de assistidos.
      if (await checkIfInWatchlist(userId, dataId)) {
        toast({
          title: "Error!", // Notifica se o item já estiver na lista.
          description: "This item is already in your watchlist.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return false;
      }
      // Adiciona o item à coleção "watchlist" do usuário.
      await setDoc(doc(db, "users", userId, "watchlist", dataId), data);
      toast({
        title: "Success!", // Notifica que o item foi adicionado com sucesso.
        description: "Added to watchlist",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.log(error, "Error adding document"); // Log de erro.
      toast({
        title: "Error!", // Exibe uma notificação de erro.
        description: "An error occurred.",
        status: "error",
        isClosable: true,
      });
    }
  };

  // Função para verificar se um item já está na lista de assistidos de um usuário.
  const checkIfInWatchlist = async (userId, dataId) => {
    const docRef = doc(
      db,
      "users",
      userId?.toString(),
      "watchlist",
      dataId?.toString()
    );

    const docSnap = await getDoc(docRef); // Recupera o documento do Firestore.
    if (docSnap.exists()) {
      return true; // Retorna true se o documento existir (item está na lista).
    } else {
      return false; // Retorna false se o documento não existir.
    }
  };

  // Função para remover um item da lista de assistidos de um usuário.
  const removeFromWatchlist = async (userId, dataId) => {
    try {
      // Remove o documento correspondente da lista de assistidos.
      await deleteDoc(
        doc(db, "users", userId?.toString(), "watchlist", dataId?.toString())
      );
      toast({
        title: "Success!", // Notifica que o item foi removido com sucesso.
        description: "Removed from watchlist",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error!", // Notifica erro durante a remoção.
        description: "An error occurred.",
        status: "error",
        isClosable: true,
      });
      console.log(error, "Error while deleting doc"); // Log de erro.
    }
  };

  // Função para recuperar todos os itens da lista de assistidos de um usuário.
  const getWatchlist = useCallback(async (userId) => {
    // Recupera todos os documentos da lista de assistidos do usuário.
    const querySnapshot = await getDocs(
      collection(db, "users", userId, "watchlist")
    );
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(), // Mapeia os dados dos itens da lista.
    }));
    return data; // Retorna os itens da lista de assistidos.
  }, []); // O useCallback evita a recriação da função.

  // Retorna as funções que podem ser utilizadas por outros componentes.
  return {
    addDocument,
    addToWatchlist,
    checkIfInWatchlist,
    removeFromWatchlist,
    getWatchlist,
  };
};
