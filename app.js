/* ========================
   ESTADO GLOBAL
======================== */
let imagemAtual = 1;
let modoProva = false;
let topicoAtual = "";
const totalImagens = 159;

/* ========================
   SEÇÕES
======================== */
const secoes = [
  { nome: "Regiões", inicio: 1, fim: 5 },
  { nome: "Fáscias", inicio: 6, fim: 38 },
  { nome: "Regiões da axila", inicio: 39, fim: 46 },
  { nome: "Vasos axilares", inicio: 47, fim: 64 },
  { nome: "Artérias do braço e antebraço", inicio: 65, fim: 105 },
  { nome: "Drenagem venosa superficial", inicio: 106, fim: 129 },
  { nome: "Drenagem venosa profunda", inicio: 130, fim: 159 }
];

/* ========================
   ELEMENTOS
======================== */
const atlasImage = document.getElementById("atlasImage");
const tituloImagem = document.getElementById("tituloImagem");
const secaoAtual = document.getElementById("secaoAtual");
const secaoSelect = document.getElementById("secaoSelect");
const buscaInput = document.getElementById("buscaInput");
const listaRoteiro = document.getElementById("listaRoteiro");
const infoEstrutura = document.getElementById("infoEstrutura");
const observacaoTexto = document.getElementById("observacaoTexto");

/* ========================
   SOM CLICK
======================== */
function tocarClick() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.frequency.value = 600;
    gain.gain.value = 0.08;

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {
    console.log("Som não disponível neste navegador.");
  }
}

document.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") tocarClick();
});

/* ========================
   UTIL
======================== */
function encontrarSecao(n) {
  return secoes.find(s => n >= s.inicio && n <= s.fim);
}

/* ========================
   OBSERVAÇÕES
======================== */
function carregarObservacao() {
  if (!observacaoTexto) return;
  observacaoTexto.value = localStorage.getItem(`obs-${imagemAtual}`) || "";
}

function salvarObservacao() {
  if (!observacaoTexto) return;
  localStorage.setItem(`obs-${imagemAtual}`, observacaoTexto.value);
  alert("Observação salva ✔");
}

/* ========================
   IMAGEM
======================== */
function atualizarImagem() {
  if (!atlasImage) return;

  atlasImage.src = `./imagens/${imagemAtual}.png`;

  const secao = encontrarSecao(imagemAtual);

  if (tituloImagem) {
    tituloImagem.textContent = modoProva
      ? "Qual estrutura?"
      : `Imagem ${imagemAtual} de ${totalImagens}`;
  }

  if (secaoAtual) {
    secaoAtual.textContent = secao?.nome || "";
  }

  atualizarInfo();
  carregarObservacao();
}

/* ========================
   NAVEGAÇÃO
======================== */
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

function irParaImagem(n) {
  n = Number(n);
  if (n >= 1 && n <= totalImagens) {
    imagemAtual = n;
    modoProva = false;
    atualizarImagem();
  }
}

/* ========================
   SEÇÕES
======================== */
function carregarSecoes() {
  if (!secaoSelect) return;

  secaoSelect.innerHTML = "";

  secoes.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s.inicio;
    opt.textContent = `${s.nome} (${s.inicio}-${s.fim})`;
    secaoSelect.appendChild(opt);
  });
}

/* ========================
   ROTEIRO
======================== */
function carregarRoteiro() {
  if (!listaRoteiro) return;

  listaRoteiro.innerHTML = "";

  secoes.forEach(s => {
    const div = document.createElement("div");
    div.className = "item-roteiro";

    div.innerHTML = `<strong>${s.nome}</strong><br>Imagens ${s.inicio} até ${s.fim}`;

    div.onclick = () => {
      mostrarAba("atlas");
      irParaImagem(s.inicio);
    };

    listaRoteiro.appendChild(div);
  });
}

/* ========================
   INFORMAÇÕES POR SEÇÃO
======================== */
const infoSecoes = {
  "Regiões": `
🔴 REGIÕES DO MEMBRO SUPERIOR

1. Região escapular:
Área posterior da cintura escapular, relacionada à escápula, músculos trapézio, romboides, supraespinal, infraespinal e redondo maior/menor.

2. Região deltóidea:
Recobre o músculo deltóide. Relação profunda com o nervo axilar e artéria circunflexa posterior do úmero.

3. Região peitoral:
Área anterior do tórax, contendo peitoral maior, peitoral menor e fáscia clavipeitoral.

4. Região braquial anterior:
Compartimento flexor do braço. Contém bíceps braquial, braquial, coracobraquial e nervo musculocutâneo.

5. Região braquial posterior:
Compartimento extensor. Contém tríceps braquial, nervo radial e artéria braquial profunda.

6. Região cubital anterior:
Fossa cubital. Contém veia intermédia do cotovelo, tendão do bíceps, artéria braquial e nervo mediano.

7. Região cubital posterior:
Região do olécrano. Relacionada ao tríceps braquial e ao nervo ulnar.

8. Região antebraquial anterior:
Compartimento flexor/pronador. Relaciona-se aos nervos mediano e ulnar.

9. Região antebraquial posterior:
Compartimento extensor/supinador. Relaciona-se ao nervo radial.

10. Região carpal anterior:
Região do túnel do carpo. Contém retináculo dos flexores, nervo mediano e tendões flexores.

11. Região carpal posterior:
Dorso do punho. Contém retináculo dos extensores e tendões extensores.

12. Região palmar:
Face anterior da mão. Contém aponeurose palmar, arcos vasculares e nervos digitais.

13. Região dorsal da mão:
Face posterior da mão. Contém rede venosa dorsal e tendões extensores.

14. Região digital palmar:
Face anterior dos dedos. Relaciona-se aos tendões flexores e bainhas sinoviais.

15. Região digital dorsal:
Face posterior dos dedos. Relaciona-se às expansões extensoras.
`,

  "Fáscias": `
🔴 FÁSCIAS DO MEMBRO SUPERIOR

1. Fáscia peitoral:
Reveste o músculo peitoral maior. Continua lateralmente com a fáscia braquial e profundamente relaciona-se à fáscia clavipeitoral.

2. Fáscia clavipeitoral:
Profunda ao peitoral maior. Envolve subclávio e peitoral menor. É atravessada pela veia cefálica, artéria toracoacromial e nervo peitoral lateral.

3. Membrana costocoracoide:
Parte espessada da fáscia clavipeitoral entre processo coracoide e primeira costela.

4. Ligamento suspensor da axila:
Extensão inferior da fáscia clavipeitoral até a fáscia axilar. Mantém a concavidade da axila.

5. Fáscia axilar:
Forma a base da axila. Relaciona-se superiormente com vasos axilares, plexo braquial e linfonodos.

6. Fáscia deltóidea:
Reveste o deltóide. Continua inferiormente com a fáscia braquial.

7. Fáscia supraespinal:
Reveste o músculo supraespinal na fossa supraespinal da escápula.

8. Fáscia infraespinal:
Reveste o músculo infraespinal na fossa infraespinal.

9. Fáscia subescapular:
Reveste o músculo subescapular na face anterior da escápula.

10. Fáscia braquial:
Envolve o braço e emite septos intermusculares medial e lateral.

11. Septo intermuscular medial:
Separa compartimentos anterior e posterior do braço.O septo intermuscular medial do braço fica entre:
m. braquial (anterior) e m. tríceps braquial – cabeça medial (posterior). Relaciona-se ao nervo ulnar.

12. Septo intermuscular lateral:
Separa compartimentos anterior e posterior. O septo intermuscular lateral separa:
m. braquial (anterior) e m. tríceps braquial – cabeça lateral (posterior). Relaciona-se ao nervo radial.

13. Compartimento anterior do braço:
Contém bíceps braquial, braquial, coracobraquial e nervo musculocutâneo.

14. Compartimento posterior do braço:
Contém tríceps braquial, nervo radial e artéria braquial profunda.

15. Fáscia do antebraço:
Continuação da fáscia braquial. Envolve músculos flexores e extensores.

16. Membrana interóssea:
Entre rádio e ulna. Transmite forças e separa compartimentos profundos.

17. Compartimento anterior do antebraço:
Flexores e pronadores. Relaciona-se aos nervos mediano e ulnar.

18. Compartimento posterior do antebraço:
Extensores e supinadores. Relaciona-se ao nervo radial.

19. Ligamento carpal palmar:
Superficial ao retináculo dos flexores. Não forma o túnel do carpo.

20. Retináculo dos flexores:
Entre escafoide, trapézio, pisiforme e hamato. Forma o túnel do carpo.

21. Fáscia palmar:
Cobre a palma da mão.

22. Fáscia tenar:
Cobre músculos tenares na base do polegar.

23. Fáscia hipotenar:
Cobre músculos hipotenares na base do dedo mínimo.

24. Aponeurose palmar:
Espessamento central da fáscia palmar.

25. Raios digitais longitudinais:
Prolongamentos da aponeurose palmar para os dedos.

26. Ligamento metacarpal transverso superficial:
Une regiões metacarpais distais.

27. Ligamentos cutâneos:
Fixam pele à fáscia profunda.

28. Retináculo dos extensores:
No dorso do punho. Mantém tendões extensores em posição.

29. Fáscia dorsal da mão:
Fina e móvel. Permite acúmulo visível de edema.

30. Túnel ulnar — Canal de Guyon:
Entre pisiforme e hâmulo do hamato. Contém nervo ulnar e artéria ulnar.
`,

  "Regiões da axila": `
🔴 REGIÕES DA AXILA

1. Ápice da axila:
Canal cervicoaxilar. Limitado pela clavícula, primeira costela e borda superior da escápula.
Permite passagem da artéria axilar, veia axilar e plexo braquial.

2. Base da axila:
Formada por pele, tecido subcutâneo e fáscia axilar.
Relaciona-se inferiormente com a concavidade axilar.

3. Parede medial:
Formada pela parede torácica e músculo serrátil anterior.
Relaciona-se ao nervo torácico longo.
Lesão causa escápula alada.

4. Parede lateral:
Formada pelo úmero, principalmente o sulco intertubercular.
Relaciona-se com artéria axilar, veia axilar e cordões do plexo braquial.

5. Parede anterior:
Formada por peitoral maior, peitoral menor, subclávio e fáscia clavipeitoral.
Relaciona-se com vasos toracoacromiais e veia cefálica.

6. Parede posterior:
Formada por subescapular, redondo maior e latíssimo do dorso.
Relaciona-se com artéria subescapular, nervo axilar e artéria circunflexa posterior do úmero.

7. Prega axilar:
Anterior: peitoral maior.
Posterior: latíssimo do dorso e redondo maior.
Importante como limite clínico da axila.
`,

  "Vasos axilares": `
🔴 VASOS AXILARES

1. Artéria axilar:
Continuação da artéria subclávia.
Inicia na borda lateral da primeira costela e termina na borda inferior do redondo maior.
Depois continua como artéria braquial.

2. Primeira parte:
Entre a primeira costela e a borda medial do peitoral menor.
Ramo: artéria torácica superior.
Relações: veia axilar medial, plexo braquial lateral, pleura posteriormente.

3. Segunda parte:
Posterior ao peitoral menor.
Ramos: artéria toracoacromial e artéria torácica lateral.
Relaciona-se intimamente com os fascículos lateral, medial e posterior do plexo braquial.

4. Terceira parte:
Da borda lateral do peitoral menor até a borda inferior do redondo maior.
Ramos: subescapular, circunflexa anterior do úmero e circunflexa posterior do úmero.

5. Artéria torácica superior:
Supre músculos peitorais e parede torácica superior.

6. Artéria toracoacromial:
Perfura a fáscia clavipeitoral.
Ramos: clavicular, acromial, deltoideo e peitoral.

7. Artéria torácica lateral:
Segue na parede medial da axila.
Supre serrátil anterior, peitorais e mama lateral.

8. Artéria subescapular:
Maior ramo da artéria axilar.
Divide-se em artéria circunflexa da escápula e artéria toracodorsal.

9. Artéria circunflexa anterior do úmero:
Contorna anteriormente o colo cirúrgico do úmero.
Relaciona-se à cabeça do úmero e articulação do ombro.

10. Artéria circunflexa posterior do úmero:
Passa com o nervo axilar pelo espaço quadrangular.
Risco em fratura do colo cirúrgico do úmero.

11. Artéria circunflexa da escápula:
Ramo da subescapular. Passa pela região escapular e participa da anastomose escapular.

12. Artéria toracodorsal:
Ramo da subescapular. Irriga o músculo latíssimo do dorso.

13. Veia axilar:
Medial e anterior à artéria axilar.
Formada pela união das veias braquiais com a veia basílica.
Recebe a veia cefálica.
Continua como veia subclávia na borda lateral da primeira costela.
`,

  "Artérias do braço e antebraço": `
🔴 ARTÉRIAS DO BRAÇO E ANTEBRAÇO

1. Artéria braquial:
Continuação da artéria axilar.
Percorre o sulco bicipital medial.
Termina na fossa cubital, dividindo-se em radial e ulnar.

2. Artéria colateral ulnar superior:
Segue com o nervo ulnar.
Participa da rede arterial do cotovelo.

3. Artéria colateral ulnar inferior:
Origina-se próxima ao cotovelo.
Anastomosa-se com artérias recorrentes ulnares.

4. Artéria nutrícia do úmero:
Penetra o forame nutrício do úmero.
Nutre a diáfise umeral.

5. Artéria braquial profunda:
Acompanha o nervo radial no sulco radial do úmero.
Supre o compartimento posterior do braço.

6. Artéria colateral média:
Ramo da braquial profunda.
Participa da anastomose posterior do cotovelo.

7. Artéria colateral radial:
Ramo da braquial profunda.
Anastomosa-se com a artéria recorrente radial.

8. Artéria ulnar:
Ramo medial terminal da braquial.
Segue profunda aos músculos flexores.
Forma principalmente o arco palmar superficial.

9. Artéria recorrente ulnar anterior:
Participa da anastomose anterior do cotovelo.

10. Artéria recorrente ulnar posterior:
Participa da anastomose medial/posterior do cotovelo.

11. Artéria interóssea comum:
Ramo da artéria ulnar.
Divide-se em interóssea anterior e posterior.

12. Artéria interóssea anterior:
Desce na face anterior da membrana interóssea.
Supre músculos flexores profundos.

13. Artéria interóssea posterior:
Passa para o compartimento posterior.
Supre músculos extensores.

14. Artéria interóssea recorrente:
Participa da rede arterial do cotovelo.

15. Artéria radial:
Ramo lateral terminal da braquial.
Segue no lado do polegar.
Superficial no punho.
Forma principalmente o arco palmar profundo.

16. Artéria recorrente radial:
Participa da anastomose lateral do cotovelo.
`,

  "Drenagem venosa superficial": `
🔴 DRENAGEM VENOSA SUPERFICIAL

1. Veias digitais dorsais:
Drenam a face dorsal dos dedos.

2. Veias metacarpais dorsais:
Recebem as veias digitais dorsais.

3. Arco venoso dorsal:
Localizado no dorso da mão.

4. Rede venosa dorsal:
Principal origem das veias cefálica e basílica.

5. Veia cefálica do antebraço:
Sobe lateralmente no antebraço, no lado do polegar.

6. Veia basílica do antebraço:
Sobe medialmente no antebraço, no lado do dedo mínimo.

7. Veia intermédia do antebraço:
Variável. Pode drenar para cefálica, basílica ou intermédia do cotovelo.

8. Veia intermédia do cotovelo:
Localizada na fossa cubital.
Conecta cefálica e basílica.
Principal local de punção venosa.
Superficial à aponeurose bicipital.

9. Veia cefálica:
Sobe lateralmente no braço.
Passa pelo sulco deltopeitoral.
Perfura a fáscia clavipeitoral.
Desemboca na veia axilar.

10. Veia basílica:
Sobe medialmente.
Perfura a fáscia braquial no braço.
Une-se às veias braquiais para formar a veia axilar.
`,

  "Drenagem venosa profunda": `
🔴 DRENAGEM VENOSA PROFUNDA

1. Veias digitais palmares próprias:
Acompanham as artérias digitais próprias.

2. Veias digitais palmares comuns:
Recebem drenagem das veias digitais próprias.

3. Arco venoso palmar superficial:
Profundo à aponeurose palmar.
Relaciona-se ao arco arterial superficial.

4. Veias metacarpais palmares:
Entre os metacarpos.
Drenam para os arcos venosos.

5. Arco venoso palmar profundo:
Junto aos metacarpos.
Relaciona-se ao arco arterial profundo.

6. Veias radiais:
Acompanham a artéria radial no lado lateral do antebraço.

7. Veias ulnares:
Acompanham a artéria ulnar no lado medial do antebraço.

8. Veias interósseas anteriores:
Acompanham a artéria interóssea anterior na face anterior da membrana interóssea.

9. Veias interósseas posteriores:
Drenam o compartimento extensor do antebraço.

10. Veias braquiais:
Veias satélites da artéria braquial.
Unem-se à veia basílica.

11. Veia braquial profunda:
Acompanha a artéria braquial profunda e o nervo radial.

12. Veia axilar:
Formada pela união das veias braquiais com a veia basílica.
Recebe a veia cefálica.

13. Veia subclávia:
Continuação da veia axilar.
Passa inferior à clavícula e anterior ao escaleno anterior.
Drena para a veia braquiocefálica.
`
};

/* ========================
   INFO DA IMAGEM
======================== */
function atualizarInfo() {
  if (!infoEstrutura) return;

  const secao = encontrarSecao(imagemAtual);
  const nomeSecao = secao?.nome || "";

  infoEstrutura.innerHTML = `
    <strong>Imagem:</strong> ${imagemAtual}<br>
    <strong>Seção:</strong> ${nomeSecao}<br><br>
    <pre style="white-space: pre-wrap; font-family: inherit;">${infoSecoes[nomeSecao] || "Informação anatômica ainda não cadastrada."}</pre>
  `;
}

/* ========================
   ABAS
======================== */
function mostrarAba(nome) {
  document.querySelectorAll(".aba").forEach(a => a.classList.remove("ativa"));

  const mapa = {
    atlas: "abaAtlas",
    roteiro: "abaRoteiro",
    relacoes: "abaRelacoes",
    saibaMais: "abaSaibaMais"
  };

  document.getElementById(mapa[nome])?.classList.add("ativa");
}

/* ========================
   ÁUDIO IMAGEM
======================== */
function ouvirImagem() {
  const secao = encontrarSecao(imagemAtual);

  const texto = modoProva
    ? "Identifique a estrutura"
    : `Imagem ${imagemAtual}. ${secao?.nome || ""}`;

  const fala = new SpeechSynthesisUtterance(texto);
  fala.lang = "pt-BR";

  speechSynthesis.cancel();
  speechSynthesis.speak(fala);
}

/* ========================
   SAIBA MAIS EM BOTÕES
======================== */
const topicosSaibaMais = {
  regioes: infoSecoes["Regiões"],
  fascias: infoSecoes["Fáscias"],
  axila: infoSecoes["Regiões da axila"],
  vasosAxilares: infoSecoes["Vasos axilares"],
  arterias: infoSecoes["Artérias do braço e antebraço"],
  venosaSuperficial: infoSecoes["Drenagem venosa superficial"],
  venosaProfunda: infoSecoes["Drenagem venosa profunda"]
};

function abrirTopico(topico) {
  topicoAtual = topico;
  const el = document.getElementById("conteudoSaibaMais");

  if (el) {
    el.textContent = topicosSaibaMais[topico] || "Tópico não encontrado.";
  }
}

function ouvirTopico() {
  speechSynthesis.cancel();

  const texto = topicosSaibaMais[topicoAtual] || "Escolha um tópico primeiro.";

  const fala = new SpeechSynthesisUtterance(texto);
  fala.lang = "pt-BR";
  fala.rate = 0.9;

  speechSynthesis.speak(fala);
}

function pararAudio() {
  speechSynthesis.cancel();
}

/* ========================
   MODO PROVA
======================== */
function ativarModoProva() {
  modoProva = !modoProva;
  atualizarImagem();
}

/* ========================
   ZOOM
======================== */
function toggleZoom() {
  if (!atlasImage) return;
  atlasImage.classList.toggle("zoom");
}

/* ========================
   PDF
======================== */
function gerarPDFTodas() {
  const win = window.open("", "_blank");

  let html = `<html><body>`;

  for (let i = 1; i <= totalImagens; i++) {
    html += `<img src="./imagens/${i}.png" style="width:100%"><hr>`;
  }

  html += `</body></html>`;

  win.document.write(html);

  setTimeout(() => win.print(), 800);
}

/* ========================
   EVENTOS
======================== */
secaoSelect?.addEventListener("change", () => {
  irParaImagem(secaoSelect.value);
});

buscaInput?.addEventListener("input", () => {
  if (/^\d+$/.test(buscaInput.value)) {
    irParaImagem(buscaInput.value);
  }
});

document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") proximaImagem();
  if (e.key === "ArrowLeft") imagemAnterior();
});

/* ========================
   INIT
======================== */
carregarSecoes();
carregarRoteiro();
atualizarImagem();
