import PropTypes from "prop-types";
// Importa `PropTypes` para validação dos tipos das props recebidas

const VideoComponent = ({ id, small }) => {
  // Declara o componente `VideoComponent` que recebe `id` e `small` como props.
  // `id` é o identificador do vídeo no YouTube, e `small` é um booleano que define o tamanho do vídeo.

  return (
    <iframe
      width="100%"
      height={small ? "150" : "500"}
      src={`https://www.youtube.com/embed/${id}`}
      title="YouTube video player"
      allowFullScreen
    ></iframe>
    // Renderiza um iframe para exibir um vídeo do YouTube.
    // Define a largura como 100% e a altura com base na prop `small`:
    // se `small` for true, a altura será "150"; caso contrário, será "500".
    // O `src` usa o `id` passado para definir a URL do vídeo.
    // `allowFullScreen` permite que o vídeo seja visualizado em tela cheia.
  );
};

VideoComponent.propTypes = {
  id: PropTypes.string.isRequired,
  small: PropTypes.bool,
};
// Define `PropTypes` para garantir que `id` seja uma string obrigatória
// e `small` seja um booleano opcional

export default VideoComponent;
// Exporta o componente `VideoComponent` para uso em outras partes da aplicação
