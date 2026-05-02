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
  el.imagem.alt = dado.nome;
  el.imagem.style.transform = `scale(${estado.zoom})`;

  el.legenda.textContent = estado.modoProva ? "Qual estrutura?" : dado.nome;
  el.contador.textContent = `${estado.atual} / ${TOTAL_IMAGENS} — ${secao?.nome || ""}`;

  el.infoBox.innerHTML = `
    <h3>${dado.nome}</h3>
    <p><strong>Seção:</strong> ${secao?.nome || "Não definida"}</p>
    <p><strong>Relações rápidas:</strong> ${dado.relacoes}</p>
    <p><strong>Comparação:</strong> ${dado.comparacao}</p>
  `;

  el.respostaProva.textContent = "";
}

function irPara(numero) {
  const n = Number(numero);
  if (n < 1 || n > TOTAL_IMAGENS) return;
  estado.atual = n;
  estado.zoom = 1;
  renderizar();
}

function proxima() {
  irPara(Math.min(estado.atual + 1, TOTAL_IMAGENS));
}

function anterior() {
  irPara(Math.max(estado.atual - 1, 1));
}

function falar(texto) {
  speechSynthesis.cancel();
  const voz = new SpeechSynthesisUtterance(texto);
  voz.lang = "pt-BR";
  voz.rate = 0.95;
  speechSynthesis.speak(voz);
}

function ouvirAtual() {
  const dado = obterDado();
  const secao = obterSecao();
  falar(`${dado.nome}. Seção: ${secao.nome}. Relações: ${dado.relacoes}. Comparação: ${dado.comparacao}.`);
}

function alternarInfo() {
  el.infoBox.style.display = el.infoBox.style.display === "block" ? "none" : "block";
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

  const numeroDireto = Number(termo);
  if (numeroDireto >= 1 && numeroDireto <= TOTAL_IMAGENS) {
    irPara(numeroDireto);
    return;
  }

  for (const numero in DADOS) {
    const dado = DADOS[numero];
    const texto = `${dado.nome} ${dado.relacoes} ${dado.comparacao}`.toLowerCase();

    if (texto.includes(termo)) {
      irPara(numero);
      return;
    }
  }
}

function carregarSecoes() {
  el.secaoSelect.innerHTML = "";

  SECOES.forEach(secao => {
    const option = document.createElement("option");
    option.value = secao.inicio;
    option.textContent = `${secao.nome} (${secao.inicio}–${secao.fim})`;
    el.secaoSelect.appendChild(option);
  });
}

function carregarRoteiro() {
  el.roteiroLista.innerHTML = SECOES.map(secao => `
    <div class="card">
      <strong>${secao.nome}</strong>
      <p>Imagens ${secao.inicio} a ${secao.fim}</p>
      <button onclick="irPara(${secao.inicio})">Abrir seção</button>
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
  falar(`Resposta: ${dado.nome}`);
}

function configurarTabs() {
  document.querySelectorAll(".tabs button").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tabs button").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));

      btn.classList.add("active");
      $(`tab-${btn.dataset.tab}`).classList.add("active");
    });
  });
}

function configurarVoz() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return;

  const rec = new SpeechRecognition();
  rec.lang = "pt-BR";

  rec.onresult = (event) => {
    const comando = event.results[0][0].transcript.toLowerCase();

    if (comando.includes("próxima")) proxima();
    else if (comando.includes("anterior") || comando.includes("voltar")) anterior();
    else if (comando.includes("ouvir")) ouvirAtual();
    else if (comando.includes("prova")) iniciarProva();
    else if (comando.includes("resposta")) revelarResposta();
    else {
      const numero = comando.match(/\d+/)?.[0];
      if (numero) irPara(Number(numero));
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
      alert("No iPhone: toque em Compartilhar e depois em Adicionar à Tela de Início. No Android: use o menu do navegador ou aguarde o botão de instalação aparecer.");
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

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") proxima();
    if (e.key === "ArrowLeft") anterior();
    if (e.key === "+") aumentarZoom();
    if (e.key === "-") resetZoom();
  });
}

function registrarServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js");
  }
}

window.onload = () => {
  carregarSecoes();
  carregarRoteiro();
  carregarRelacoes();
  configurarTabs();
  configurarEventos();
  configurarVoz();
  configurarInstalacao();
  registrarServiceWorker();
  renderizar();
};
