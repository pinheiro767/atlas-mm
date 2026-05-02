let atual = 1;
let prova = false;

function atualizar() {
  document.getElementById("imagem").src = `imagens/${atual}.png`;

  if (prova) {
    document.getElementById("legenda").innerText = "Qual estrutura?";
  } else {
    document.getElementById("legenda").innerText = `Imagem ${atual}`;
  }
}

function proxima() {
  if (atual < 159) {
    atual++;
    atualizar();
  }
}

function anterior() {
  if (atual > 1) {
    atual--;
    atualizar();
  }
}

function ouvir() {
  let texto = `Imagem ${atual}`;
  let fala = new SpeechSynthesisUtterance(texto);
  speechSynthesis.speak(fala);
}

function modoProva() {
  prova = !prova;
  atualizar();
}

function gerarPDF() {
  window.print();
}

window.onload = atualizar;

/* INSTALAR APP */
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

document.getElementById("instalar").onclick = async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
  }
};

/* OFFLINE */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}