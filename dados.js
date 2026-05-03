const TOTAL_IMAGENS = 159;

const SECOES = [
  { nome: "Regiões", inicio: 1, fim: 5 },
  { nome: "Estruturas fasciais", inicio: 6, fim: 38 },
  { nome: "Regiões da axila", inicio: 39, fim: 46 },
  { nome: "Vasos axilares", inicio: 47, fim: 64 },
  { nome: "Artérias do braço e do antebraço", inicio: 65, fim: 105 },
  { nome: "Drenagem venosa superficial", inicio: 106, fim: 129 },
  { nome: "Drenagem venosa profunda", inicio: 130, fim: 159 }
];

const DADOS = {
  1: {
    nome: "Escapular",
    relacoes: "Região posterior relacionada à escápula.",
    comparacao: "Diferencia-se da região deltóidea por estar mais medial e posterior."
  },
  2: {
    nome: "Deltóidea",
    relacoes: "Região lateral do ombro, relacionada ao músculo deltoide.",
    comparacao: "Mais lateral que a escapular e mais superficial na projeção do ombro."
  },
  3: {
    nome: "Peitoral",
    relacoes: "Região anterior do tórax e ombro, relacionada ao músculo peitoral maior.",
    comparacao: "Anterior, enquanto a região escapular é posterior."
  }

  /*
    Complete depois seguindo o mesmo modelo:

    4: {
      nome: "Braquial anterior",
      relacoes: "Digite aqui...",
      comparacao: "Digite aqui..."
    },

    As imagens estão em:
    ./imagens/1.png até ./imagens/159.png
  */
};
