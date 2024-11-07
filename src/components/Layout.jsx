import Navbar from "./Navbar";
// Importa o componente `Navbar` para ser exibido na interface

import PropTypes from "prop-types";
// Importa `PropTypes` para verificação de tipos das props recebidas

const Layout = ({ children }) => {
  // Declara o componente `Layout`, que recebe `children` como prop.
  // `children` representa o conteúdo (outros componentes) que serão exibidos dentro deste layout.
  
  return (
    <>
      <Navbar />
      {/* Exibe o componente `Navbar` no topo do layout */}
      
      <main>{children}</main>
      {/* Exibe o conteúdo `children` passado para o `Layout` dentro da tag <main> */}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  // Define o tipo esperado para a prop `children` como `node`, ou seja, um elemento renderizável.
  // `isRequired` indica que `children` é obrigatório.
};

export default Layout;
// Exporta o componente `Layout` para ser utilizado em outras partes da aplicação.
