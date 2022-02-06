'use strict';

const IMG_NUMBER = 5;

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function paintImage(imgNumber) {
  const body = document.querySelector('body');
  const image = new Image();
  image.src = `images/${imgNumber + 1}.jpg`;
  image.classList.add('bgimage');
  body.prepend(image);
}

init();
