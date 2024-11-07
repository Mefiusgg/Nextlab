// Importa o componente Outlet do 'react-router-dom' para renderizar rotas filhos
import { Outlet } from "react-router-dom";

// Importa o componente Layout, que será usado como estrutura de página
import Layout from "./components/Layout";

// Componente principal da aplicação
function App() {
  return (
    // O componente Layout é usado como estrutura principal para renderizar o conteúdo
    <Layout>
      {/* O Outlet renderiza os componentes filhos, ou seja, o conteúdo das rotas 
      definidas na configuração de rotas do React Router */}
      <Outlet />
    </Layout>
  );
}

// Exporta o componente App como o padrão para ser utilizado em outros arquivos
export default App;