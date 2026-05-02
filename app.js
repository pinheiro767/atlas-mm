const estado = {
  atual: 1,
  zoom: 1,
  modoProva: false,
  instalacao: null
};

const $ = (id) => document.getElementById(id);

const el = {
  imagem: $("imagem"),
  legenda: $("legenda"),
  contador: $("contador"),
  infoBox: $("infoBox"),
  secaoSelect: $("secaoSelect"),
  buscaInput: $("buscaInput"),
  roteiroLista: $("roteiroLista"),
  relacoesLista: $("relacoesLista"),
  respostaProva: $("respostaProva")
};

function obterDado(numero = estado.atual) {
  return DADOS[numero] || {
    nome: `Imagem ${numero}`,
    relacoes: "Relações anatômicas ainda não cadastradas.",
    comparacao: "Comparação ainda não cadastrada."
  };
}

function obterSecao(numero = estado.atual) {
  return SECOES.find(sec => numero >= sec.inicio && numero <= sec.fim);
}

function renderizar() {
  const dado = obterDado();
  const secao = obterSecao();

  el.imagem.src = `./imagens/${estado.atual}.png`;
  el.imagem.style.transform = `scale(${estado.zoom})`;

  el.legenda.textContent = estado.modoProva ? "Qual estrutura?" : dado.nome;
  el.contador.textContent = `${estado.atual} / ${TOTAL_IMAGENS} — ${secao?.nome || ""}`;

  el.infoBox.innerHTML = `
    <h3>${dado.nome}</h3>
    <p><strong>Seção:</strong> ${secao?.nome || "Não definida"}</p>
    <p><strong>Relações:</strong> ${dado.relacoes}</p>
    <p><strong>Comparação:</strong> ${dado.comparacao}</p>
  `;
}

function irPara(numero) {
  const n = Number(numero);
  if (n < 1 || n > TOTAL_IMAGENS) return;

  estado.atual = n;
  estado.zoom = 1;
  renderizar();
}

function proxima() {
  irPara(estado.atual + 1);
}

function anterior() {
  irPara(estado.atual - 1);
}

function ouvirAtual() {
  speechSynthesis.cancel();

  const dado = obterDado();
  const secao = obterSecao();

  const fala = new SpeechSynthesisUtterance(
    `${dado.nome}. Seção: ${secao?.nome}. Relações: ${dado.relacoes}. Comparação: ${dado.comparacao}.`
  );

  fala.lang = "pt-BR";
  speechSynthesis.speak(fala);
}

function alternarInfo() {
  el.infoBox.style.display =
    el.infoBox.style.display === "block" ? "none" : "block";
}

function gerarPDF() {
  window.print();
}

function resetZoom() {
  estado.zoom = 1;
  renderizar();
}

function aumentarZoom() {
  estado.zoom = estado.zoom >= 2.5 ? 1 : estado.zoom + 0.25;
  renderizar();
}

function buscar() {
  const termo = el.buscaInput.value.trim().toLowerCase();
  if (!termo) return;

  const numero = Number(termo);
  if (numero >= 1 && numero <= TOTAL_IMAGENS) {
    irPara(numero);
    return;
  }

  for (const i in DADOS) {
    const dado = DADOS[i];
    const texto = `${dado.nome} ${dado.relacoes} ${dado.comparacao}`.toLowerCase();

    if (texto.includes(termo)) {
      irPara(i);
      return;
    }
  }
}

function carregarSecoes() {
  el.secaoSelect.innerHTML = "";

  SECOES.forEach(secao => {
    const option = document.createElement("option");
    option.value = secao.inicio;
    option.textContent = `${secao.nome} (${secao.inicio}-${secao.fim})`;
    el.secaoSelect.appendChild(option);
  });
}

function carregarRoteiro() {
  el.roteiroLista.innerHTML = SECOES.map(secao => `
    <div class="card">
      <strong>${secao.nome}</strong>
      <p>Imagens ${secao.inicio} a ${secao.fim}</p>
      <button onclick="irPara(${secao.inicio})">Abrir</button>
    </div>
  `).join("");
}

function carregarRelacoes() {
  let html = "";

  for (let i = 1; i <= TOTAL_IMAGENS; i++) {
    const dado = obterDado(i);

    html += `
      <div class="card">
        <strong>${i}. ${dado.nome}</strong>
        <p>${dado.relacoes}</p>
        <p><em>${dado.comparacao}</em></p>
        <button onclick="irPara(${i})">Ver imagem</button>
      </div>
    `;
  }

  el.relacoesLista.innerHTML = html;
}

function iniciarProva() {
  estado.modoProva = true;
  irPara(Math.floor(Math.random() * TOTAL_IMAGENS) + 1);
}

function revelarResposta() {
  const dado = obterDado();
  el.respostaProva.textContent = `Resposta: ${dado.nome}`;
}

function configurarVoz() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    $("btnVoz").style.display = "none";
    return;
  }

  const rec = new SpeechRecognition();
  rec.lang = "pt-BR";

  rec.onresult = (event) => {
    const comando = event.results[0][0].transcript.toLowerCase();

    if (comando.includes("próxima")) proxima();
    else if (comando.includes("anterior") || comando.includes("voltar")) anterior();
    else if (comando.includes("ouvir")) ouvirAtual();
    else {
      const numero = comando.match(/\d+/)?.[0];
      if (numero) irPara(numero);
    }
  };

  $("btnVoz").onclick = () => rec.start();
}

function configurarInstalacao() {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    estado.instalacao = e;
  });

  $("btnInstalar").onclick = async () => {
    if (estado.instalacao) {
      estado.instalacao.prompt();
      estado.instalacao = null;
    } else {
      alert("No iPhone: toque em Compartilhar e depois em Adicionar à Tela de Início.");
    }
  };
}

function configurarEventos() {
  $("btnProxima").onclick = proxima;
  $("btnAnterior").onclick = anterior;
  $("btnAudio").onclick = ouvirAtual;
  $("btnInfo").onclick = alternarInfo;
  $("btnPDF").onclick = gerarPDF;
  $("btnLimparZoom").onclick = resetZoom;
  $("btnIniciarProva").onclick = iniciarProva;
  $("btnRevelar").onclick = revelarResposta;

  el.imagem.onclick = aumentarZoom;
  el.buscaInput.oninput = buscar;
  el.secaoSelect.onchange = () => irPara(el.secaoSelect.value);
}

function registrarServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  carregarSecoes();
  carregarRoteiro();
  carregarRelacoes();
  configurarEventos();
  configurarVoz();
  configurarInstalacao();
  registrarServiceWorker();
  renderizar();
});
