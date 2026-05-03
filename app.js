/* ========================
   ESTADO GLOBAL
======================== */
let imagemAtual = 1;
let modoProva = false;
const totalImagens = 159;

/* ========================
   SEÇÕES
======================== */
const secoes = [
  { nome: "Regiões", inicio: 1, fim: 5 },
  { nome: "Fáscias", inicio: 6, fim: 38 },
  { nome: "Regiões da axila", inicio: 39, fim: 46 },
  { nome: "Vasos axilares", inicio: 47, fim: 69 },
  { nome: "Artérias do braço e antebraço", inicio: 70, fim: 105 },
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
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.frequency.value = 600;
  gain.gain.value = 0.08;

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.05);
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
  observacaoTexto.value =
    localStorage.getItem(`obs-${imagemAtual}`) || "";
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
  atlasImage.src = `./imagens/${imagemAtual}.png`;

  const secao = encontrarSecao(imagemAtual);

  tituloImagem.textContent = modoProva
    ? "Qual estrutura?"
    : `Imagem ${imagemAtual} de ${totalImagens}`;

  secaoAtual.textContent = secao?.nome || "";

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
    atualizarImagem();
  }
}

/* ========================
   SEÇÕES
======================== */
function carregarSecoes() {
  if (!secaoSelect) return;

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
   INFO
======================== */
function atualizarInfo() {
  if (!infoEstrutura) return;

  const secao = encontrarSecao(imagemAtual);

  infoEstrutura.innerHTML = `
    <strong>Imagem:</strong> ${imagemAtual}<br>
    <strong>Seção:</strong> ${secao?.nome || ""}
  `;
}

/* ========================
   ABAS (CORRIGIDO)
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
   ÁUDIO
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
   SAIBA MAIS
======================== */

const textoSaibaMais = `
VASOS + AXILA (LOCALIZAÇÃO EXATA + RELAÇÕES ANATÔMICAS FINAS)
Baseado em Moore + Netter + Sobotta, com orientação clínica.

🔴 I. VASOS AXILARES (ARTÉRIA AXILAR)

📍 LOCALIZAÇÃO GERAL:
Continuação da artéria subclávia.
Inicia na borda lateral da 1ª costela.
Termina na borda inferior do m. redondo maior → vira artéria braquial.

📍 RELAÇÃO FUNDAMENTAL:
A artéria é dividida em 3 partes pela posição em relação ao m. peitoral menor.

🟥 1ª PARTE (PROXIMAL AO PEITORAL MENOR)

📍 Localização exata:
Entre:
borda lateral da 1ª costela
borda medial do peitoral menor

🔗 Relações:
anterior → fáscia clavipeitoral + peitoral maior
posterior → pleura + pulmão (ápice)
medial → veia axilar
lateral → plexo braquial

🩸 Ramo:
a. torácica superior

👉 Clínico:
risco de pneumotórax em lesões profundas.

🟥 2ª PARTE (POSTERIOR AO PEITORAL MENOR)

📍 Localização exata:
Profunda ao m. peitoral menor.

🔗 Relações:
rodeada pelos fascículos do plexo braquial:
lateral
medial
posterior

🩸 Ramos:
a. toracoacromial
a. torácica lateral

👉 Clínico:
compressões neurovasculares.

🟥 3ª PARTE (DISTAL AO PEITORAL MENOR)

📍 Localização exata:
Entre:
borda lateral do peitoral menor
borda inferior do redondo maior

🔗 Relações:
posterior → subescapular, latíssimo do dorso
lateral → úmero (colo cirúrgico)
nervo axilar passa aqui

🩸 Ramos:
a. subescapular
a. circunflexa anterior do úmero
a. circunflexa posterior do úmero

👉 Clínico:
fratura do colo cirúrgico → lesão da circunflexa posterior + nervo axilar.

🔴 II. VEIA AXILAR

📍 Localização exata:
medial à artéria axilar
formada pela união:
veias braquiais
veia basílica

🔗 Relações:
anterior → peitoral maior
posterior → artéria axilar
medial → parede torácica

👉 Clínico:
acesso venoso central
risco de embolia aérea

🔴 III. ARTÉRIA BRAQUIAL

📍 Localização exata:
continuação da artéria axilar.
Percorre o sulco bicipital medial.

🔗 Relações:
lateral → bíceps braquial
medial → nervo mediano
profunda → úmero

🩸 Ramos importantes:
a. braquial profunda
colaterais ulnar superior e inferior

👉 Clínico:
ponto de aferição da pressão arterial.
fraturas supracondilares → risco de isquemia.

🔴 IV. ARTÉRIAS DO ANTEBRAÇO

🟥 Artéria radial
📍 Localização:
lateral, lado do polegar.
Passa anterior ao rádio.
Superficial no punho.
Forma o arco palmar profundo.

🟥 Artéria ulnar
📍 Localização:
medial, lado do dedo mínimo.
Profunda aos músculos flexores.
Forma o arco palmar superficial.

🟥 Artérias interósseas
📍 Localização:
ao longo da membrana interóssea.

🔗 Dividem-se em:
anterior → compartimento flexor
posterior → compartimento extensor

🔴 V. DRENAGEM VENOSA SUPERFICIAL

🟥 Rede venosa dorsal

📍 Localização:
dorso da mão
superficial à fáscia dorsal

👉 Origina:
veia cefálica lateral
veia basílica medial

🟥 Veia cefálica

📍 Localização exata:
Origina-se na rede venosa dorsal da mão, no lado lateral.
Sobe pelo lado lateral do antebraço.
Passa anterior ao cotovelo, no sulco bicipital lateral.
Continua no braço entre o m. deltóide e o m. peitoral maior.
Penetra a fáscia clavipeitoral no triângulo deltopeitoral.
Desemboca na veia axilar.

🔗 Relações finas:
superficial → pele e tecido subcutâneo
profunda → fáscia braquial
próxima ao nervo cutâneo lateral do antebraço

👉 Clínico:
acesso venoso
via para cateter venoso central
visível em indivíduos magros

🟥 Veia basílica

📍 Localização exata:
Origina-se na rede venosa dorsal, no lado medial.
Sobe pelo lado medial do antebraço.
No braço, perfura a fáscia braquial no terço médio.
Une-se às veias braquiais → forma a veia axilar.

🔗 Relações:
próxima ao nervo cutâneo medial do antebraço
profunda no braço, diferente da cefálica

👉 Clínico:
acesso venoso profundo
menos visível e mais protegida

🟥 Veia intermédia do cotovelo

📍 Localização exata:
na fossa cubital.
Conecta:
veia cefálica
veia basílica

🔗 Relações:
superficial à aponeurose bicipital.
Profunda:
artéria braquial
nervo mediano

👉 Clínico:
principal local de punção venosa.
A aponeurose protege estruturas profundas.

🔴 VI. DRENAGEM VENOSA PROFUNDA

🟥 Veias digitais palmares:
ao lado das artérias digitais, nos dedos.
Drenam para veias metacarpais.

🟥 Veias metacarpais palmares:
entre os metacarpos, profundas na palma.
Drenam para arcos venosos.

🟥 Arco venoso palmar superficial:
superficial aos tendões flexores.
Profundo à aponeurose palmar.
Formado principalmente pela veia ulnar.

🟥 Arco venoso palmar profundo:
profundo aos tendões flexores.
Junto aos ossos metacarpais.
Acompanha o arco arterial profundo.

🟥 Veias radiais:
acompanham a artéria radial.
Lado lateral do antebraço.

🟥 Veias ulnares:
acompanham a artéria ulnar.
Lado medial do antebraço.

🟥 Veias interósseas:
ao longo da membrana interóssea.
Drenam compartimentos profundos.

🟥 Veias braquiais:
veias satélites da artéria braquial.
No sulco bicipital medial.
Unem-se à basílica → formam veia axilar.

🟥 Veia axilar:
medial à artéria axilar.
Da borda inferior do redondo maior até a 1ª costela.
Continua como veia subclávia.

🟥 Veia subclávia:
anterior ao músculo escaleno anterior.
Inferior à clavícula.
Drena para veia braquiocefálica.

👉 Clínico:
acesso venoso central
risco de pneumotórax

🔴 FÁSCIAS DO MEMBRO SUPERIOR — LOCALIZAÇÃO E RELAÇÕES EXATAS

🟥 1. Fáscia peitoral
Reveste diretamente o músculo peitoral maior.
Estende-se da clavícula → esterno → cartilagens costais → fáscia do braço.

🔗 Proximidades:
superior → clavícula
medial → esterno
lateral → continua com fáscia braquial
profunda → separa-se da clavipeitoral

👉 Clínico:
via de disseminação de infecção torácica para axila.

🟥 2. Fáscia clavipeitoral
Situada profunda ao peitoral maior.
Entre músculo subclávio e músculo peitoral menor.

🔗 Atravessada por:
v. cefálica
a. toracoacromial
nervo peitoral lateral

Continuidade inferior → ligamento suspensor da axila.

👉 Clínico:
referência em acesso cirúrgico axilar.

🟥 3. Membrana costocoracoide
Parte espessada da fáscia clavipeitoral.
Entre processo coracoide e 1ª costela.

🔗 Proximidades:
anterior → peitoral maior
posterior → plexo braquial e vasos axilares

👉 Clínico:
ponto de compressão neurovascular.

🟥 4. Ligamento suspensor da axila
Extensão inferior da fáscia clavipeitoral.
Vai até a fáscia axilar.
Mantém a concavidade da axila.

🟥 5. Fáscia axilar
Forma o assoalho da axila.
Entre as pregas anterior e posterior.

🔗 Proximidades:
superior → vasos e plexo braquial
inferior → pele
lateral → úmero

🟥 6. Fáscia deltóidea
Reveste o músculo deltóide.
Origina-se da clavícula, acrômio e espinha da escápula.
Continua inferiormente com a fáscia braquial.

🟥 7–9. Fáscias escapulares
Supraespinal → fossa supraespinal.
Infraespinal → fossa infraespinal.
Subescapular → face anterior da escápula.

Relacionam-se com manguito rotador e articulação do ombro.

🟥 10. Fáscia do braço
Envolve todo o braço como um cilindro.
Divide em:
compartimento anterior flexor
compartimento posterior extensor

👉 Clínico:
síndrome compartimental.

🟥 11–12. Septos intermusculares
Ligam a fáscia braquial ao úmero.
Dividem compartimentos medial e lateral.

🔗 Proximidades:
nervo radial
artéria braquial

🟥 13–14. Compartimentos do braço
Anterior:
bíceps
braquial
nervo musculocutâneo

Posterior:
tríceps
nervo radial

🟥 15. Fáscia do antebraço
Continuação da fáscia braquial.
Reveste rádio e ulna.
Espessamentos distais: retináculos.

🟥 16. Membrana interóssea
Entre rádio e ulna.
Fibras oblíquas.
Função: transmissão de força e estabilidade.

🟥 17–18. Compartimentos do antebraço
Anterior:
flexores
nervo mediano

Posterior:
extensores
nervo radial

🟥 19. Ligamento carpal palmar
Superficial ao retináculo dos flexores.
Não forma túnel do carpo.

🟥 20. Retináculo dos flexores
Entre:
tubérculo do escafoide/trapézio
pisiforme/hamato

Forma o túnel do carpo.

Conteúdo:
nervo mediano
tendões flexores

🟥 21–24. Fáscias palmares
fáscia palmar → cobre palma
tenar → base do polegar
hipotenar → base do dedo mínimo
aponeurose palmar → estrutura central espessa

👉 Clínico:
contratura de Dupuytren.

🟥 25–27. Estruturas digitais
raios digitais
ligamentos metacarpais
ligamentos cutâneos

Função:
estabilidade da preensão.

🟥 28. Retináculo dos extensores
Dorso do punho.
Fixado ao rádio e ulna.
Divide em 6 compartimentos tendíneos.

🟥 29. Fáscia dorsal da mão
Fina e móvel.
Permite edema visível.

🟥 30. Túnel ulnar — Canal de Guyon
Entre pisiforme e hamato.

Conteúdo:
nervo ulnar
artéria ulnar

👉 Clínico:
compressão → mão em garra.

🔴 REGIÕES DO MEMBRO SUPERIOR

1. Região escapular:
Área posterior da cintura escapular envolvendo escápula, trapézio e romboides.
Clínico: lesão do nervo acessório pode causar fraqueza do trapézio.

2. Região deltóidea:
Recobre o músculo deltóide.
Clínico: local de aplicação intramuscular.

3. Região peitoral:
Área anterior do tórax, com peitoral maior e menor.
Clínico: acesso cirúrgico axilar e drenagem mamária.

4–5. Região braquial anterior/posterior:
Anterior → compartimento flexor.
Posterior → compartimento extensor.
Clínico: lesão do nervo radial → incapacidade de extensão.

6–7. Região cubital anterior/posterior:
Anterior → fossa cubital.
Posterior → região do olécrano.

8–9. Região antebraquial anterior/posterior:
Anterior → flexores e nervo mediano.
Posterior → extensores e nervo radial.

10–11. Região carpal anterior/posterior:
Anterior → túnel do carpo.
Posterior → compartimentos extensores.

12–15. Mão:
palmar
dorsal
digitais palmares
digitais dorsais

Especialização para preensão e precisão.

📚 BASE CIENTÍFICA:
Moore, Anatomia Orientada para a Clínica, 9ª edição.
Netter, Atlas de Anatomia Humana, 7ª edição.
Sobotta, Atlas de Anatomia Humana, 24ª edição.
`;

🟥 Veia Cefálica

📍 Localização exata:
Origina-se na rede venosa dorsal da mão, no lado lateral.
Sobe pelo lado lateral do antebraço.
Passa anterior ao cotovelo, no sulco bicipital lateral.
Continua no braço entre o músculo deltóide e o músculo peitoral maior.
Penetra a fáscia clavipeitoral no triângulo deltopeitoral.
Desemboca na veia axilar.

🔗 Relações finas:
Superficial: pele e tecido subcutâneo.
Profunda: fáscia braquial.
Próxima ao nervo cutâneo lateral do antebraço.

👉 Clínico:
Acesso venoso.
Via para cateter venoso central.
Visível em indivíduos magros.

🟥 Veia Basílica

📍 Localização exata:
Origina-se na rede venosa dorsal, no lado medial.
Sobe pelo lado medial do antebraço.
No braço, perfura a fáscia braquial no terço médio.
Une-se às veias braquiais e forma a veia axilar.

🔗 Relações:
Próxima ao nervo cutâneo medial do antebraço.
Profunda no braço, diferente da cefálica.

👉 Clínico:
Acesso venoso profundo.
Menos visível e mais protegida.

🟥 Veia Intermédia do Cotovelo

📍 Localização exata:
Na fossa cubital.
Conecta a veia cefálica à veia basílica.

🔗 Relações:
Superficial à aponeurose bicipital.
Profunda à artéria braquial e ao nervo mediano.

👉 Clínico:
Principal local de punção venosa.
A aponeurose bicipital protege estruturas profundas.

🔴 VI. DRENAGEM VENOSA PROFUNDA

🟥 Veias Digitais Palmares
Localizam-se ao lado das artérias digitais, nos dedos.
Drenam para as veias metacarpais.

🟥 Veias Metacarpais Palmares
Localizam-se entre os metacarpos, profundas na palma.
Drenam para os arcos venosos.

🟥 Arco Venoso Palmar Superficial
Localiza-se superficial aos tendões flexores e profundo à aponeurose palmar.
É formado principalmente pela drenagem ulnar.

🟥 Arco Venoso Palmar Profundo
Localiza-se profundo aos tendões flexores, junto aos ossos metacarpais.
Acompanha o arco arterial profundo.

🟥 Veias Radiais
Acompanham a artéria radial no lado lateral do antebraço.

🟥 Veias Ulnares
Acompanham a artéria ulnar no lado medial do antebraço.

🟥 Veias Interósseas anterior e posterior
Localizam-se ao longo da membrana interóssea.
Drenam compartimentos profundos.

🟥 Veias Braquiais
São veias satélites da artéria braquial, no sulco bicipital medial.
Unem-se à veia basílica e formam a veia axilar.

🟥 Veia Axilar
Localiza-se medial à artéria axilar.
Vai da borda inferior do redondo maior até a primeira costela.
Continua como veia subclávia.

🟥 Veia Subclávia
Localiza-se anterior ao músculo escaleno anterior e inferior à clavícula.
Drena para a veia braquiocefálica.

👉 Clínico:
Acesso venoso central.
Risco de pneumotórax.

🔴 VII. AXILA — ANATOMIA CIRÚRGICA COMPLETA

🟥 Ápice da axila
Localização: canal cervicoaxilar.
Limitado por clavícula, primeira costela e escápula.
Permite a passagem da artéria subclávia, que se torna axilar, e do plexo braquial.

🟥 Base da axila
Formada por pele e fáscia axilar.
Sustentada pelo ligamento suspensor da axila.

🟥 Parede anterior
Formada por peitoral maior, peitoral menor e fáscia clavipeitoral.
Contém vasos torácicos.

🟥 Parede posterior
Formada por subescapular, redondo maior e latíssimo do dorso.
Relaciona-se com a passagem da artéria subescapular.

🟥 Parede medial
Formada pela parede torácica, costelas e músculo serrátil anterior.
Lesão do nervo torácico longo pode causar escápula alada.

🟥 Parede lateral
Formada pelo úmero, especialmente o sulco intertubercular.
Contém artéria braquial e nervos do plexo.

🟥 Prega axilar
Anterior: peitoral maior.
Posterior: latíssimo do dorso e redondo maior.
Define os limites da axila.

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

🚨 Principais correlações clínicas:
Síndrome do desfiladeiro torácico.
Lesão do nervo axilar em luxação do ombro.
Trombose venosa profunda.
Acesso venoso central.
Dissecção axilar.
Isquemia do membro superior.

🔴 I. VASOS AXILARES — ARTÉRIA AXILAR

📍 Localização geral:
Continuação da artéria subclávia.
Inicia na borda lateral da primeira costela.
Termina na borda inferior do músculo redondo maior, onde se torna artéria braquial.

Relação fundamental:
A artéria axilar é dividida em três partes pela posição em relação ao músculo peitoral menor.

🟥 Primeira parte
Entre a borda lateral da primeira costela e a borda medial do peitoral menor.
Anterior: fáscia clavipeitoral e peitoral maior.
Posterior: pleura e ápice do pulmão.
Medial: veia axilar.
Lateral: plexo braquial.
Ramo: artéria torácica superior.
Clínico: risco de pneumotórax.

🟥 Segunda parte
Profunda ao músculo peitoral menor.
Rodeada pelos fascículos lateral, medial e posterior do plexo braquial.
Ramos: artéria toracoacromial e artéria torácica lateral.
Clínico: compressões neurovasculares.

🟥 Terceira parte
Entre a borda lateral do peitoral menor e a borda inferior do redondo maior.
Posterior: subescapular e latíssimo do dorso.
Lateral: úmero, especialmente colo cirúrgico.
O nervo axilar passa nessa região.
Ramos: subescapular, circunflexa anterior do úmero e circunflexa posterior do úmero.
Clínico: fratura do colo cirúrgico pode lesar a circunflexa posterior e o nervo axilar.

🔴 II. VEIA AXILAR

Medial à artéria axilar.
Formada pela união das veias braquiais com a veia basílica.

Relações:
Anterior: peitoral maior.
Posterior: artéria axilar.
Medial: parede torácica.

Clínico:
Acesso venoso central.
Risco de embolia aérea.

🔴 III. ARTÉRIA BRAQUIAL

Continuação da artéria axilar.
Percorre o sulco bicipital medial.

Relações:
Lateral: bíceps braquial.
Medial: nervo mediano.
Profunda: úmero.

Ramos:
Artéria braquial profunda.
Colaterais ulnar superior e inferior.

Clínico:
Ponto de aferição da pressão arterial.
Fraturas supracondilares podem causar isquemia.

🔴 IV. ARTÉRIAS DO ANTEBRAÇO

🟥 Artéria radial
Lateral, no lado do polegar.
Passa anterior ao rádio e torna-se superficial no punho.
Forma o arco palmar profundo.

🟥 Artéria ulnar
Medial, no lado do dedo mínimo.
Segue profunda aos músculos flexores.
Forma o arco palmar superficial.

🟥 Artérias interósseas
Localizam-se ao longo da membrana interóssea.
Anterior: compartimento flexor.
Posterior: compartimento extensor.

🔴 FÁSCIAS DO MEMBRO SUPERIOR

🟥 1. Fáscia peitoral
Reveste diretamente o músculo peitoral maior.
Estende-se da clavícula ao esterno, cartilagens costais e fáscia do braço.
Pode ser via de disseminação de infecção torácica para axila.

🟥 2. Fáscia clavipeitoral
Profunda ao peitoral maior.
Entre o músculo subclávio e o músculo peitoral menor.
Atravessada pela veia cefálica, artéria toracoacromial e nervo peitoral lateral.
Continua inferiormente como ligamento suspensor da axila.

🟥 3. Membrana costocoracoide
Parte espessada da fáscia clavipeitoral.
Entre o processo coracoide e a primeira costela.
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
Continua com a fáscia braquial.

🟥 7 a 9. Fáscias escapulares
Supraespinal: fossa supraespinal.
Infraespinal: fossa infraespinal.
Subescapular: face anterior da escápula.

🟥 10. Fáscia do braço
Envolve o braço como um cilindro.
Divide compartimentos anterior flexor e posterior extensor.

🟥 11 e 12. Septos intermusculares
Ligam a fáscia braquial ao úmero.
Dividem compartimentos medial e lateral.

🟥 13 e 14. Compartimentos do braço
Anterior: bíceps, braquial e nervo musculocutâneo.
Posterior: tríceps e nervo radial.

🟥 15. Fáscia do antebraço
Continuação da fáscia braquial.
Reveste rádio e ulna.
Forma espessamentos distais, chamados retináculos.

🟥 16. Membrana interóssea
Entre rádio e ulna.
Transmite força e contribui para estabilidade.

🟥 17 e 18. Compartimentos do antebraço
Anterior: flexores e nervo mediano.
Posterior: extensores e nervo radial.

🟥 19. Ligamento carpal palmar
Superficial ao retináculo dos flexores.
Não forma o túnel do carpo.

🟥 20. Retináculo dos flexores
Entre tubérculo do escafoide, trapézio, pisiforme e hamato.
Forma o túnel do carpo.
Contém nervo mediano e tendões flexores.

🟥 21 a 24. Fáscias palmares
Fáscia palmar: cobre a palma.
Fáscia tenar: base do polegar.
Fáscia hipotenar: base do dedo mínimo.
Aponeurose palmar: estrutura central espessa.

🟥 25 a 27. Estruturas digitais
Raios digitais, ligamentos metacarpais e ligamentos cutâneos.
Função: estabilidade da preensão.

🟥 28. Retináculo dos extensores
Dorso do punho.
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
Área posterior da cintura escapular, envolvendo escápula, trapézio e romboides.

2. Região deltóidea:
Recobre o músculo deltóide.
Local de aplicação intramuscular.

3. Região peitoral:
Área anterior do tórax, incluindo peitoral maior e menor.

4 e 5. Região braquial anterior e posterior:
Anterior: compartimento flexor.
Posterior: compartimento extensor.

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

📚 Referências:
Moore, Anatomia Orientada para a Clínica, 9ª edição.
Netter, Atlas de Anatomia Humana, 7ª edição.
Sobotta, Atlas de Anatomia Humana, 24ª edição.
`;

const saibaMaisEl = document.getElementById("conteudoSaibaMais");

if (saibaMaisEl) {
  saibaMaisEl.textContent = textoSaibaMais;
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
secaoSelect?.addEventListener("change", () =>
  irParaImagem(secaoSelect.value)
);

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
