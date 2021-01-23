'use strict';

const toDoinput = document.querySelector('.js-toDoinput');
const sentences = [
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
  'Clone Coding',
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function checkInputFocuse() {
  return toDoinput === document.activeElement;
}

async function updatePlaceholder() {
  if (!checkInputFocuse()) {
    if (toDoinput.placeholder === '') {
      const now = new Date();
      const sentence = sentences[now.getSeconds() % sentences.length];
      for (const i in sentence) {
        if (checkInputFocuse()) break;
        toDoinput.placeholder += sentence[i];
        await sleep(50);
      }
    } else {
      const sentence = toDoinput.placeholder;
      for (const i in sentence) {
        if (checkInputFocuse()) break;
        toDoinput.placeholder = sentence.slice(0, sentence.length - i - 1);
        await sleep(20);
      }
    }
  }
  setTimeout(updatePlaceholder, 1000);
}

function init() {
  toDoinput.addEventListener('focus', () => (toDoinput.placeholder = ''));
  setTimeout(updatePlaceholder, 1000);
}

init();
