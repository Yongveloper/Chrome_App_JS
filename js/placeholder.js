'use strict';

const toDoinput = document.querySelector('.js-toDoinput');
const terms = [
  "Let's exercise",
  "Listen to Nico's lecture!",
  'Should be cleaned',
  'Reading',
  'React Study',
  'Vanilla JS Study',
  'Eat!',
  'Washing Dogs',
  'Vanilla JS Challenge!',
  "Let's clone coding",
  'English Study',
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function inputFocused() {
  return toDoinput === document.activeElement;
}

async function updatePlaceholder() {
  if (!inputFocused()) {
    if (toDoinput.placeholder === '') {
      const now = new Date();
      const term = terms[now.getSeconds() % terms.length];
      for (const i in term) {
        if (inputFocused()) break;
        toDoinput.placeholder += term[i];
        await sleep(50);
      }
    } else {
      const term = toDoinput.placeholder;
      for (const i in term) {
        if (inputFocused()) break;
        toDoinput.placeholder = term.slice(0, term.length - i - 1);
        await sleep(20);
      }
    }
  }
  setTimeout(updatePlaceholder, 1000);
}

if (toDoinput) {
  toDoinput.addEventListener('focus', () => (toDoinput.placeholder = ''));
  setTimeout(updatePlaceholder, 1000);
}
