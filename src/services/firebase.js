// Importa as funções necessárias do SDK do Firebase.
import { initializeApp } from "firebase/app"; // Função para inicializar o aplicativo Firebase.
import { getAuth } from "firebase/auth"; // Função para obter a autenticação do Firebase.
import { getFirestore } from "firebase/firestore"; // Função para obter o Firestore do Firebase.

// A configuração do Firebase para o seu aplicativo web.
// Os valores das chaves da configuração são obtidos de variáveis de ambiente (por segurança).
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // Chave da API do Firebase.
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, // Domínio de autenticação do Firebase.
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID, // ID do projeto do Firebase.
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET, // Bucket de armazenamento do Firebase.
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, // ID do remetente de mensagens (para Firebase Cloud Messaging).
  appId: import.meta.env.VITE_FIREBASE_APP_ID, // ID do aplicativo Firebase.
};

// Inicializa o aplicativo Firebase com a configuração fornecida.
// Essa função configura o Firebase para ser usado no seu aplicativo.
const app = initializeApp(firebaseConfig);

// Exporta a referência à autenticação Firebase, para ser usada em outras partes do aplicativo.
// A autenticação permite lidar com o login, logout, registro de usuários, etc.
export const auth = getAuth(app);

// Exporta a referência ao Firestore do Firebase, para ser usada em outras partes do aplicativo.
// Firestore é o banco de dados NoSQL do Firebase para armazenar dados de forma estruturada.
export const db = getFirestore(app);