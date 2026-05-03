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
const observacaoTexto = document.getElementById("observacaoTexto");
const conteudoSaibaMais = document.getElementById("conteudoSaibaMais");

const textoSaibaMais = `
VASOS + AXILA — LOCALIZAÇÃO EXATA E RELAÇÕES ANATÔMICAS FINAS
Baseado em Moore, Netter e Sobotta, com orientação clínica.

🔴 I. VASOS AXILARES — ARTÉRIA AXILAR

📍 Localização geral:
Continuação da artéria subclávia.
Inicia na borda lateral da 1ª costela.
Termina na borda inferior do músculo redondo maior, onde se torna artéria braquial.

📍 Relação fundamental:
A artéria axilar é dividida em três partes pela posição em relação ao músculo peitoral menor.

🟥 1ª parte — proximal ao peitoral menor

📍 Localização:
Entre a borda lateral da 1ª costela e a borda medial do peitoral menor.

🔗 Relações:
Anterior: fáscia clavipeitoral e peitoral maior.
Posterior: pleura e ápice do pulmão.
Medial: veia axilar.
Lateral: plexo braquial.

🩸 Ramo:
Artéria torácica superior.

👉 Clínico:
Risco de pneumotórax em lesões profundas.

🟥 2ª parte — posterior ao peitoral menor

📍 Localização:
Profunda ao músculo peitoral menor.

🔗 Relações:
Rodeada pelos fascículos lateral, medial e posterior do plexo braquial.

🩸 Ramos:
Artéria toracoacromial.
Artéria torácica lateral.

👉 Clínico:
Região importante em compressões neurovasculares.

🟥 3ª parte — distal ao peitoral menor

📍 Localização:
Entre a borda lateral do peitoral menor e a borda inferior do redondo maior.

🔗 Relações:
Posterior: subescapular e latíssimo do dorso.
Lateral: úmero, especialmente o colo cirúrgico.
O nervo axilar passa nessa região.

🩸 Ramos:
Artéria subescapular.
Artéria circunflexa anterior do úmero.
Artéria circunflexa posterior do úmero.

👉 Clínico:
Fratura do colo cirúrgico pode lesar a artéria circunflexa posterior do úmero e o nervo axilar.

🔴 II. VEIA AXILAR

📍 Localização:
Medial à artéria axilar.
Formada pela união das veias braquiais com a veia basílica.

🔗 Relações:
Anterior: peitoral maior.
Posterior: artéria axilar.
Medial: parede torácica.

👉 Clínico:
Acesso venoso central.
Risco de embolia aérea.

🔴 III. ARTÉRIA BRAQUIAL

📍 Localização:
Continuação da artéria axilar.
Percorre o sulco bicipital medial.

🔗 Relações:
Lateral: bíceps braquial.
Medial: nervo mediano.
Profunda: úmero.

🩸 Ramos:
Artéria braquial profunda.
Artéria colateral ulnar superior.
Artéria colateral ulnar inferior.

👉 Clínico:
Ponto de aferição da pressão arterial.
Fraturas supracondilares podem causar risco de isquemia.

🔴 IV. ARTÉRIAS DO ANTEBRAÇO

🟥 Artéria radial
Lateral, no lado do polegar.
Passa anterior ao rádio.
Torna-se superficial no punho.
Forma principalmente o arco palmar profundo.

🟥 Artéria ulnar
Medial, no lado do dedo mínimo.
Segue profunda aos músculos flexores.
Forma principalmente o arco palmar superficial.

🟥 Artérias interósseas
Localizam-se ao longo da membrana interóssea.
Dividem-se em anterior, relacionada ao compartimento flexor, e posterior, relacionada ao compartimento extensor.

🔴 V. DRENAGEM VENOSA SUPERFICIAL

🟥 Rede venosa dorsal
Localiza-se no dorso da mão.
É superficial à fáscia dorsal.
Origina a veia cefálica lateralmente e a veia basílica medialmente.

🟥 Veia cefálica

📍 Localização:
Origina-se na rede venosa dorsal da mão, no lado lateral.
Sobe pelo lado lateral do antebraço.
Passa anterior ao cotovelo, no sulco bicipital lateral.
Continua no braço entre o músculo deltóide e o músculo peitoral maior.
Penetra a fáscia clavipeitoral no triângulo deltopeitoral.
Desemboca na veia axilar.

🔗 Relações:
Superficial: pele e tecido subcutâneo.
Profunda: fáscia braquial.
Próxima ao nervo cutâneo lateral do antebraço.

👉 Clínico:
Acesso venoso.
Via para cateter venoso central.
Mais visível em indivíduos magros.

🟥 Veia basílica

📍 Localização:
Origina-se na rede venosa dorsal, no lado medial.
Sobe pelo lado medial do antebraço.
No braço, perfura a fáscia braquial no terço médio.
Une-se às veias braquiais para formar a veia axilar.

🔗 Relações:
Próxima ao nervo cutâneo medial do antebraço.
Torna-se profunda no braço, diferente da cefálica.

👉 Clínico:
Acesso venoso profundo.
Menos visível e mais protegida.

🟥 Veia intermédia do cotovelo

📍 Localização:
Na fossa cubital.
Conecta a veia cefálica à veia basílica.

🔗 Relações:
Superficial à aponeurose bicipital.
Profunda à artéria braquial e ao nervo mediano.

👉 Clínico:
Principal local de punção venosa.
A aponeurose bicipital protege estruturas profundas.

🔴 VI. DRENAGEM VENOSA PROFUNDA

🟥 Veias digitais palmares
Localizam-se ao lado das artérias digitais, nos dedos.
Drenam para as veias metacarpais.

🟥 Veias metacarpais palmares
Localizam-se entre os metacarpos, profundamente na palma.
Drenam para os arcos venosos.

🟥 Arco venoso palmar superficial
Localiza-se superficial aos tendões flexores e profundo à aponeurose palmar.
É formado principalmente pela drenagem ulnar.

🟥 Arco venoso palmar profundo
Localiza-se profundamente aos tendões flexores, junto aos ossos metacarpais.
Acompanha o arco arterial profundo.

🟥 Veias radiais
Acompanham a artéria radial no lado lateral do antebraço.

🟥 Veias ulnares
Acompanham a artéria ulnar no lado medial do antebraço.

🟥 Veias interósseas
Localizam-se ao longo da membrana interóssea.
Drenam compartimentos profundos.

🟥 Veias braquiais
São veias satélites da artéria braquial, no sulco bicipital medial.
Unem-se à veia basílica e formam a veia axilar.

🟥 Veia axilar
Localiza-se medial à artéria axilar.
Vai da borda inferior do redondo maior até a 1ª costela.
Continua como veia subclávia.

🟥 Veia subclávia
Localiza-se anterior ao músculo escaleno anterior e inferior à clavícula.
Drena para a veia braquiocefálica.

👉 Clínico:
Acesso venoso central.
Risco de pneumotórax.

🔴 VII. AXILA — ANATOMIA CIRÚRGICA

🟥 Ápice da axila
Corresponde ao canal cervicoaxilar.
Limitado pela clavícula, 1ª costela e escápula.
Permite a passagem da artéria subclávia, que se torna axilar, e do plexo braquial.

🟥 Base da axila
Formada por pele e fáscia axilar.
Sustentada pelo ligamento suspensor da axila.

🟥 Parede anterior
Formada por peitoral maior, peitoral menor e fáscia clavipeitoral.
Relaciona-se com vasos torácicos.

🟥 Parede posterior
Formada por subescapular, redondo maior e latíssimo do dorso.
Relaciona-se com a artéria subescapular.

🟥 Parede medial
Formada pela parede torácica, costelas e músculo serrátil anterior.
Lesão do nervo torácico longo pode causar escápula alada.

🟥 Parede lateral
Formada pelo úmero, especialmente o sulco intertubercular.
Relaciona-se com vasos e nervos do plexo braquial.

🟥 Pregas axilares
Prega anterior: peitoral maior.
Prega posterior: latíssimo do dorso e redondo maior.
Definem limites clínicos da axila.

🔴 VIII. RELAÇÕES CRÍTICAS DA AXILA

Conteúdo central:
Artéria axilar.
Veia axilar.
Plexo braquial.
Linfonodos.

Relações essenciais:
Veia axilar: mais medial e anterior.
Artéria axilar: posição central.
Plexo braquial: ao redor da artéria.

Linfonodos axilares:
Anterior ou peitoral.
Posterior ou subescapular.
Lateral ou umeral.
Central.
Apical.

👉 Clínico:
Câncer de mama pode metastatizar para linfonodos axilares.
Pode haver necessidade de esvaziamento axilar.

Principais correlações clínicas:
Síndrome do desfiladeiro torácico.
Lesão do nervo axilar em luxação do ombro.
Trombose venosa profunda.
Acesso venoso central.
Dissecção axilar.
Isquemia do membro superior.

🔴 FÁSCIAS DO MEMBRO SUPERIOR

🟥 1. Fáscia peitoral
Reveste diretamente o músculo peitoral maior.
Estende-se da clavícula ao esterno, cartilagens costais e fáscia do braço.
Pode servir como via de disseminação de infecção torácica para a axila.

🟥 2. Fáscia clavipeitoral
Situa-se profundamente ao peitoral maior.
Fica entre o músculo subclávio e o músculo peitoral menor.
É atravessada pela veia cefálica, artéria toracoacromial e nervo peitoral lateral.
Continua inferiormente como ligamento suspensor da axila.

🟥 3. Membrana costocoracoide
Parte espessada da fáscia clavipeitoral.
Localiza-se entre o processo coracoide e a 1ª costela.
Pode ser ponto de compressão neurovascular.

🟥 4. Ligamento suspensor da axila
Extensão inferior da fáscia clavipeitoral até a fáscia axilar.
Mantém a concavidade da axila.

🟥 5. Fáscia axilar
Forma o assoalho da axila entre as pregas anterior e posterior.
Relaciona-se superiormente com vasos e plexo braquial.

🟥 6. Fáscia deltóidea
Reveste o músculo deltóide.
Origina-se na clavícula, acrômio e espinha da escápula.
Continua inferiormente com a fáscia braquial.

🟥 7 a 9. Fáscias escapulares
Fáscia supraespinal: fossa supraespinal.
Fáscia infraespinal: fossa infraespinal.
Fáscia subescapular: face anterior da escápula.

🟥 10. Fáscia do braço
Envolve o braço como um cilindro.
Divide o braço em compartimento anterior flexor e posterior extensor.

🟥 11 e 12. Septos intermusculares
Ligam a fáscia braquial ao úmero.
Dividem compartimentos medial e lateral.

🟥 13 e 14. Compartimentos do braço
Anterior: bíceps, braquial e nervo musculocutâneo.
Posterior: tríceps e nervo radial.

🟥 15. Fáscia do antebraço
Continuação da fáscia braquial.
Reveste rádio e ulna.
Forma espessamentos distais chamados retináculos.

🟥 16. Membrana interóssea
Localiza-se entre rádio e ulna.
Transmite força e contribui para estabilidade.

🟥 17 e 18. Compartimentos do antebraço
Anterior: flexores e nervo mediano.
Posterior: extensores e nervo radial.

🟥 19. Ligamento carpal palmar
Localiza-se superficial ao retináculo dos flexores.
Não forma o túnel do carpo.

🟥 20. Retináculo dos flexores
Localiza-se entre tubérculo do escafoide, trapézio, pisiforme e hamato.
Forma o túnel do carpo.
Contém nervo mediano e tendões flexores.

🟥 21 a 24. Fáscias palmares
Fáscia palmar: cobre a palma.
Fáscia tenar: base do polegar.
Fáscia hipotenar: base do dedo mínimo.
Aponeurose palmar: estrutura central espessa.

🟥 25 a 27. Estruturas digitais
Raios digitais, ligamentos metacarpais e ligamentos cutâneos.
Contribuem para estabilidade da preensão.

🟥 28. Retináculo dos extensores
Localiza-se no dorso do punho.
Divide seis compartimentos tendíneos.

🟥 29. Fáscia dorsal da mão
Fina e móvel.
Permite edema dorsal visível.

🟥 30. Túnel ulnar — Canal de Guyon
Entre pisiforme e hamato.
Contém nervo ulnar e artéria ulnar.
Compressão pode causar mão em garra.

🔴 REGIÕES DO MEMBRO SUPERIOR

1. Região escapular:
Área posterior da cintura escapular envolvendo escápula, trapézio e romboides.

2. Região deltóidea:
Recobre o músculo deltóide.
Local de aplicação intramuscular.

3. Região peitoral:
Área anterior do tórax, incluindo peitoral maior e menor.
Relaciona-se com acesso cirúrgico axilar e drenagem mamária.

4 e 5. Região braquial anterior e posterior:
Anterior: compartimento flexor.
Posterior: compartimento extensor.
Lesão do nervo radial pode causar incapacidade de extensão.

6 e 7. Região cubital anterior e posterior:
Anterior: fossa cubital.
Posterior: região do olécrano.

8 e 9. Região antebraquial anterior e posterior:
Anterior: flexores e nervo mediano.
Posterior: extensores e nervo radial.

10 e 11. Região carpal anterior e posterior:
Anterior: túnel do carpo.
Posterior: compartimentos extensores.

12 a 15. Mão:
Regiões palmar, dorsal, digitais palmares e digitais dorsais.
Especialização para preensão e precisão.

📚 Referências:
Moore, Anatomia Orientada para a Clínica, 9ª edição.
Netter, Atlas de Anatomia Humana, 7ª edição.
Sobotta, Atlas de Anatomia Humana, 24ª edição.
`;

function encontrarSecao(n) {
  return secoes.find(s => n >= s.inicio && n <= s.fim);
}

function atualizarImagem() {
  const secao = encontrarSecao(imagemAtual);

  atlasImage.src = `./imagens/${imagemAtual}.png`;
  atlasImage.alt = `Imagem ${imagemAtual}`;

  tituloImagem.textContent = modoProva
    ? "Qual estrutura?"
    : `Imagem ${imagemAtual} de ${totalImagens}`;

  secaoAtual.textContent = secao ? secao.nome : "";

  atualizarInfo();
  carregarObservacao();
}

function atualizarInfo() {
  const secao = encontrarSecao(imagemAtual);

  infoEstrutura.innerHTML = `
    <strong>Imagem:</strong> ${imagemAtual}<br>
    <strong>Seção:</strong> ${secao ? secao.nome : ""}<br><br>
    <strong>Relação:</strong> Esta imagem pertence ao bloco ${secao ? secao.nome : ""}.<br>
    <strong>Comparação:</strong> Compare com as imagens anteriores e posteriores.
  `;
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

function irParaImagem(n) {
  n = Number(n);
  if (n >= 1 && n <= totalImagens) {
    imagemAtual = n;
    modoProva = false;
    atualizarImagem();
  }
}

function carregarSecoes() {
  secaoSelect.innerHTML = "";

  secoes.forEach(secao => {
    const opt = document.createElement("option");
    opt.value = secao.inicio;
    opt.textContent = `${secao.nome} (${secao.inicio}-${secao.fim})`;
    secaoSelect.appendChild(opt);
  });
}

function carregarRoteiro() {
  listaRoteiro.innerHTML = "";

  secoes.forEach(secao => {
    const div = document.createElement("div");
    div.className = "item-roteiro";
    div.innerHTML = `<strong>${secao.nome}</strong><br>Imagens ${secao.inicio} até ${secao.fim}`;

    div.onclick = () => {
      mostrarAba("atlas");
      irParaImagem(secao.inicio);
    };

    listaRoteiro.appendChild(div);
  });
}

function mostrarAba(nome) {
  document.querySelectorAll(".aba").forEach(aba => aba.classList.remove("ativa"));

  const abas = {
    atlas: "abaAtlas",
    roteiro: "abaRoteiro",
    relacoes: "abaRelacoes",
    saibaMais: "abaSaibaMais"
  };

  const alvo = document.getElementById(abas[nome]);
  if (alvo) alvo.classList.add("ativa");
}

function carregarObservacao() {
  observacaoTexto.value = localStorage.getItem(`obs-${imagemAtual}`) || "";
}

function salvarObservacao() {
  localStorage.setItem(`obs-${imagemAtual}`, observacaoTexto.value);
  alert("Observação salva.");
}

function ouvirImagem() {
  const secao = encontrarSecao(imagemAtual);

  const texto = modoProva
    ? `Modo prova. Identifique a estrutura da imagem ${imagemAtual}.`
    : `Imagem ${imagemAtual}. Seção ${secao ? secao.nome : ""}.`;

  speechSynthesis.cancel();

  const fala = new SpeechSynthesisUtterance(texto);
  fala.lang = "pt-BR";
  speechSynthesis.speak(fala);
}

function ouvirSaibaMais() {
  speechSynthesis.cancel();

  const fala = new SpeechSynthesisUtterance(textoSaibaMais);
  fala.lang = "pt-BR";
  fala.rate = 0.9;

  speechSynthesis.speak(fala);
}

function pararAudio() {
  speechSynthesis.cancel();
}

function ativarModoProva() {
  modoProva = !modoProva;
  mostrarAba("atlas");
  atualizarImagem();
}

function toggleZoom() {
  atlasImage.classList.toggle("zoom");
}

function gerarPDFTodas() {
  const win = window.open("", "_blank");

  let html = `<html><body style="font-family:Arial">`;

  for (let i = 1; i <= totalImagens; i++) {
    const obs = localStorage.getItem(`obs-${i}`) || "";

    html += `
      <div style="page-break-after: always; text-align:center;">
        <h2>Imagem ${i} de ${totalImagens}</h2>
        <img src="./imagens/${i}.png" style="max-width:95%; max-height:80vh;">
        <p style="text-align:left;">${obs}</p>
      </div>
    `;
  }

  html += `</body></html>`;

  win.document.write(html);
  win.document.close();

  setTimeout(() => win.print(), 1000);
}

function tocarClick() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.frequency.value = 650;
    gain.gain.value = 0.05;

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch (e) {}
}

document.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") tocarClick();
});

secaoSelect.addEventListener("change", () => irParaImagem(secaoSelect.value));

buscaInput.addEventListener("input", () => {
  const valor = buscaInput.value.trim();
  if (/^\d+$/.test(valor)) irParaImagem(valor);
});

document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") proximaImagem();
  if (e.key === "ArrowLeft") imagemAnterior();
});

document.getElementById("btnInstalar").addEventListener("click", () => {
  alert("No celular, abra o menu do navegador e escolha: Adicionar à tela inicial.");
});

if (conteudoSaibaMais) {
  conteudoSaibaMais.textContent = textoSaibaMais;
}

carregarSecoes();
carregarRoteiro();
atualizarImagem();
