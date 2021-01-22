const reptil = document.querySelector('.reptil');
const fundo = document.querySelector('.fundo');

let saltando = false;
let perdeu = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!saltando) {
      pulo();
    }
  }
}

function pulo() {
  saltando = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          saltando = false;
        } else {
          position -= 20;
          reptil.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo

      position += 20;
      reptil.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (perdeu) return;

  cactus.classList.add('cactus');
  fundo.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      // Saiu da tela

      clearInterval(leftTimer);
      fundo.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // Game over

      clearInterval(leftTimer);
      perdeu = true;
      document.body.innerHTML = '<h1 class="game-over">Você perdeu!</h1>';
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}


createCactus();
document.addEventListener('keyup', handleKeyUp);