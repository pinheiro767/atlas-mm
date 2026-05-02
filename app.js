const TOTAL_IMAGENS = 159;

let imagemAtual = 1;
let zoomAtivo = false;
let deferredPrompt = null;

const secoes = [
  { nome: "Regiões", inicio: 1, fim: 21 },
  { nome: "Estruturas fasciais", inicio: 22, fim: 38 },
  { nome: "Regiões da axila", inicio: 39, fim: 46 },
  { nome: "Vasos axilares", inicio: 47, fim: 69 },
  { nome: "Artérias do braço e do antebraço", inicio: 70, fim: 105 },
  { nome: "Drenagem venosa superficial", inicio: 106, fim: 129 },
  { nome: "Drenagem venosa profunda", inicio: 130, fim: 159 }
];

const atlasImage = document.getElementById("atlasImage");
const tituloImagem = document.getElementById("tituloImagem");
const secaoAtual = document.getElementById("secaoAtual");
const secaoSelect = document.getElementById("secaoSelect");
const buscarInput = document.getElementById("buscarInput");
const observacao = document.getElementById("observacao");

const btnVoltar = document.getElementById("btnVoltar");
const btnAvancar = document.getElementById("btnAvancar");
const btnZoom = document.getElementById("btnZoom");
const btnLeitura = document.getElementById("btnLeitura");
const btnPDF = document.getElementById("btnPDF");
const btnSalvarObs = document.getElementById("btnSalvarObs");
const btnInstall = document.getElementById("btnInstall");

function obterSecao(numero) {
  return secoes.find(secao => numero >= secao.inicio && numero <= secao.fim);
}

function chaveObservacao(numero) {
  return `observacao_imagem_${numero}`;
}

function salvarObservacaoAtual() {
  localStorage.setItem(chaveObservacao(imagemAtual), observacao.value);
  alert("Observação salva!");
}

function carregarObservacaoAtual() {
  observacao.value = localStorage.getItem(chaveObservacao(imagemAtual)) || "";
}

function atualizarTela() {
  atlasImage.src = `./imagens/${imagemAtual}.png`;
  atlasImage.alt = `Imagem ${imagemAtual}`;

  tituloImagem.textContent = `Imagem ${imagemAtual} de ${TOTAL_IMAGENS}`;

  const secao = obterSecao(imagemAtual);
  secaoAtual.textContent = secao ? secao.nome : "";

  secaoSelect.value = secao ? secao.inicio : 1;

  carregarObservacaoAtual();

  zoomAtivo = false;
  atlasImage.classList.remove("zoomed");
}

function avancarImagem() {
  if (imagemAtual < TOTAL_IMAGENS) {
    imagemAtual++;
    atualizarTela();
  }
}

function voltarImagem() {
  if (imagemAtual > 1) {
    imagemAtual--;
    atualizarTela();
  }
}

function irParaImagem(numero) {
  const n = Number(numero);

  if (n >= 1 && n <= TOTAL_IMAGENS) {
    imagemAtual = n;
    atualizarTela();
  }
}

function alternarZoom() {
  zoomAtivo = !zoomAtivo;
  atlasImage.classList.toggle("zoomed", zoomAtivo);
}

function leituraImagem() {
  const textoObs = observacao.value.trim();

  const texto = textoObs
    ? `Imagem ${imagemAtual}. ${secaoAtual.textContent}. Observações: ${textoObs}`
    : `Imagem ${imagemAtual}. ${secaoAtual.textContent}.`;

  const fala = new SpeechSynthesisUtterance(texto);
  fala.lang = "pt-BR";
  fala.rate = 0.95;

  speechSynthesis.cancel();
  speechSynthesis.speak(fala);
}

function gerarPDF() {
  salvarObservacaoSilenciosa();
  window.print();
}

function salvarObservacaoSilenciosa() {
  localStorage.setItem(chaveObservacao(imagemAtual), observacao.value);
}

function carregarSecoes() {
  secoes.forEach(secao => {
    const option = document.createElement("option");
    option.value = secao.inicio;
    option.textContent = `${secao.nome} (${secao.inicio}-${secao.fim})`;
    secaoSelect.appendChild(option);
  });
}

secaoSelect.addEventListener("change", () => {
  irParaImagem(secaoSelect.value);
});

buscarInput.addEventListener("change", () => {
  irParaImagem(buscarInput.value);
  buscarInput.value = "";
});

btnAvancar.addEventListener("click", avancarImagem);
btnVoltar.addEventListener("click", voltarImagem);
btnZoom.addEventListener("click", alternarZoom);
btnLeitura.addEventListener("click", leituraImagem);
btnPDF.addEventListener("click", gerarPDF);
btnSalvarObs.addEventListener("click", salvarObservacaoAtual);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") avancarImagem();
  if (event.key === "ArrowLeft") voltarImagem();
});

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;
  btnInstall.style.display = "inline-block";
});

btnInstall.addEventListener("click", async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt = null;
  } else {
    alert("No celular, abra o menu do navegador e escolha: Adicionar à tela inicial.");
  }
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js");
}

carregarSecoes();
atualizarTela();
