let imagemAtual = 1;
let modoProva = false;
const totalImagens = 159;

const secoes = [
  { nome: "Regiões", inicio: 1, fim: 5 },
  { nome: "Fáscias", inicio: 6, fim: 38 },
  { nome: "Regiões da axila", inicio: 39, fim: 46 },
  { nome: "Vasos axilares", inicio: 47, fim: 69 },
  { nome: "Artérias do braço e antebraço", inicio: 70, fim: 105 },
  { nome: "Drenagem venosa superficial", inicio: 106, fim: 129 },
  { nome: "Drenagem venosa profunda", inicio: 130, fim: 159 }
];

const atlasImage = document.getElementById("atlasImage");
const tituloImagem = document.getElementById("tituloImagem");
const secaoAtual = document.getElementById("secaoAtual");
const secaoSelect = document.getElementById("secaoSelect");
const buscaInput = document.getElementById("buscaInput");
const listaRoteiro = document.getElementById("listaRoteiro");
const infoEstrutura = document.getElementById("infoEstrutura");

function encontrarSecao(numero) {
  return secoes.find(secao => numero >= secao.inicio && numero <= secao.fim);
}

function atualizarImagem() {
  atlasImage.src = `./imagens/${imagemAtual}.png`;
  atlasImage.alt = `Imagem anatômica ${imagemAtual}`;

  const secao = encontrarSecao(imagemAtual);

  if (modoProva) {
    tituloImagem.textContent = "Qual estrutura?";
  } else {
    tituloImagem.textContent = `Imagem ${imagemAtual} de ${totalImagens}`;
  }

  secaoAtual.textContent = secao ? secao.nome : "";
  atualizarInfo();
}

function proximaImagem() {
  if (imagemAtual < totalImagens) {
    imagemAtual++;
    modoProva = false;
    atualizarImagem();
  }
}

function imagemAnterior() {
  if (imagemAtual > 1) {
    imagemAtual--;
    modoProva = false;
    atualizarImagem();
  }
}

function irParaImagem(numero) {
  const n = Number(numero);
  if (n >= 1 && n <= totalImagens) {
    imagemAtual = n;
    modoProva = false;
    atualizarImagem();
  }
}

function carregarSecoes() {
  secoes.forEach(secao => {
    const option = document.createElement("option");
    option.value = secao.inicio;
    option.textContent = `${secao.nome} (${secao.inicio}-${secao.fim})`;
    secaoSelect.appendChild(option);
  });
}

function carregarRoteiro() {
  listaRoteiro.innerHTML = "";

  secoes.forEach(secao => {
    const div = document.createElement("div");
    div.className = "item-roteiro";
    div.innerHTML = `
      <strong>${secao.nome}</strong><br>
      Imagens ${secao.inicio} até ${secao.fim}
    `;
    div.onclick = () => {
      mostrarAba("atlas");
      irParaImagem(secao.inicio);
    };
    listaRoteiro.appendChild(div);
  });
}

function atualizarInfo() {
  const secao = encontrarSecao(imagemAtual);

  infoEstrutura.innerHTML = `
    <strong>Imagem:</strong> ${imagemAtual}<br>
    <strong>Seção:</strong> ${secao ? secao.nome : "Não definida"}<br><br>
    <strong>Relação anatômica rápida:</strong><br>
    Esta imagem pertence ao bloco "${secao ? secao.nome : ""}" do roteiro prático de Anatomia Topográfica de MMSS.<br><br>
    <strong>Comparação:</strong><br>
    Compare esta estrutura com as imagens anteriores e posteriores para reconhecer continuidade, localização, profundidade e relação topográfica.
  `;
}

function mostrarAba(nome) {
  document.querySelectorAll(".aba").forEach(aba => aba.classList.remove("ativa"));

  if (nome === "atlas") document.getElementById("abaAtlas").classList.add("ativa");
  if (nome === "roteiro") document.getElementById("abaRoteiro").classList.add("ativa");
  if (nome === "relacoes") document.getElementById("abaRelacoes").classList.add("ativa");
}

function ouvirImagem() {
  const secao = encontrarSecao(imagemAtual);
  const texto = modoProva
    ? `Modo prova. Observe a imagem ${imagemAtual} e identifique a estrutura.`
    : `Imagem ${imagemAtual}. Seção: ${secao ? secao.nome : ""}.`;

  const fala = new SpeechSynthesisUtterance(texto);
  fala.lang = "pt-BR";
  speechSynthesis.cancel();
  speechSynthesis.speak(fala);
}

function ativarModoProva() {
  modoProva = !modoProva;
  mostrarAba("atlas");
  atualizarImagem();
}

function toggleZoom() {
  atlasImage.classList.toggle("zoom");
}

function gerarPDF() {
  window.print();
}

function instalarApp() {
  alert("No celular, abra o menu do navegador e escolha: Adicionar à tela inicial.");
}

secaoSelect.addEventListener("change", () => {
  irParaImagem(secaoSelect.value);
});

buscaInput.addEventListener("input", () => {
  const valor = buscaInput.value.trim();

  if (/^\d+$/.test(valor)) {
    irParaImagem(valor);
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") proximaImagem();
  if (e.key === "ArrowLeft") imagemAnterior();
});

document.getElementById("btnInstalar").addEventListener("click", instalarApp);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js");
}

carregarSecoes();
carregarRoteiro();
atualizarImagem();
