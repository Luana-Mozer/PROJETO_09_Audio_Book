const nomeCapitulo = document.getElementById("capitulo");
const audio = document.getElementById("audio-capitulo");
const botaoPlayPause = document.getElementById("play-pause");
const botaoProximoCapitulo = document.getElementById("proximo");
const botaoCapituloAnterior = document.getElementById("anterior");

const quantidadeCapitulos = 10;
let taTocando = false;
let capitulo = 1;

function tocarFaixa() {
  // Melhora: Usa .play() e .catch() para evitar erros no console
  // caso o navegador bloqueie a reprodução automática.
  audio.play().catch(error => {
    // Isso é esperado e ignorado se o usuário não interagiu,
    // mas garante que a lógica do app não quebre.
    console.error("Falha ao tentar reproduzir o áudio:", error);
    taTocando = false;
  });

  taTocando = true;
  botaoPlayPause.classList.add("tocando");
}

function pausarFaixa() {
  audio.pause();
  taTocando = false;
  botaoPlayPause.classList.remove("tocando");
}

function tocarOuPausarFaixa() {
  if (taTocando === true) {
    pausarFaixa();
  } else {
    tocarFaixa();
  }
}

function trocarNomeCapitulo() {
    nomeCapitulo.innerText = "Capítulo " + capitulo;
}

function capituloAnterior() {
  // Pausa a faixa antes de trocar para garantir a lógica
  pausarFaixa(); 

  if (capitulo === 1) {
    capitulo = quantidadeCapitulos;
  } else {
    capitulo -= 1;
  }

  // Define o novo caminho do áudio e atualiza o nome
  audio.src = "./audios/" + capitulo + ".mp3";
  trocarNomeCapitulo();
  
  // Como o usuário clicou, podemos tentar tocar novamente
  tocarFaixa(); 
}

function proximoCapitulo() {
  // Pausa a faixa antes de trocar para garantir a lógica
  pausarFaixa(); 

  if (capitulo < quantidadeCapitulos) {
    capitulo += 1;
  } else {
    capitulo = 1;
  }

  // Define o novo caminho do áudio e atualiza o nome
  audio.src = "./audios/" + capitulo + ".mp3";
  trocarNomeCapitulo();
  
  // Como o usuário clicou (no botão ou no evento 'ended'), podemos tentar tocar.
  tocarFaixa(); 
}

// ----------------------------------------------------
// Ouve o evento "click" para iniciar as ações do player
// ----------------------------------------------------
botaoPlayPause.addEventListener("click", tocarOuPausarFaixa);
botaoCapituloAnterior.addEventListener("click", capituloAnterior);
botaoProximoCapitulo.addEventListener("click", proximoCapitulo);

// Ouve o evento "ended" (fim da música) para ir para o próximo capítulo
audio.addEventListener("ended", proximoCapitulo);
