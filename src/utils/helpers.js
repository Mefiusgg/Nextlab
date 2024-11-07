// Função para converter minutos em formato de horas e minutos (ex: 130 minutos → "2h 10m").
export const minutesTohours = (minutes) => {
  // Calcula o número de horas inteiras, usando Math.floor para arredondar para baixo.
  const hours = Math.floor(minutes / 60);
  // Calcula o restante dos minutos que não formam uma hora completa.
  const mins = minutes % 60;

  // Retorna a string formatada como "Xh Ym".
  return `${hours}h ${mins}m`;
};

// Função para converter uma avaliação (rating) em porcentagem (ex: 7.8 → "78").
export const ratingToPercentage = (rating) => {
  // Multiplica o rating por 10 e arredonda para o inteiro mais próximo (ex: 7.8 → 78).
  return (rating * 10)?.toFixed(0); // toFixed(0) arredonda para zero casas decimais.
};

// Função para determinar a cor com base na avaliação (rating).
export const resolveRatingColor = (rating) => {
  // Se o rating for maior ou igual a 7, retorna a cor verde (indicado como bom).
  if (rating >= 7) {
    return "green.400";
  } 
  // Se o rating for maior ou igual a 5 (mas menor que 7), retorna a cor laranja (indicado como mediano).
  else if (rating >= 5) {
    return "orange.400";
  } 
  // Se o rating for menor que 5, retorna a cor vermelha (indicado como ruim).
  else {
    return "red.400";
  }
};