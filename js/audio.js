'use strict';

const audioContainer = document.querySelector('#audioContainer');
const playBtnContainer = document.querySelector('.js-onOffWrap');
const playBtn = document.querySelector('.js-audioOnOff');
const audioNextBtn = document.querySelector('.js-audioNextBtn');
const source = document.querySelector('#audioSource');

const MUSIC_COUNT = 5;

let currentAudio = 1;

function playAudio() {
  audioContainer.volume = 0.2;
  audioContainer.loop = true;
  audioContainer.play();
  playBtn.innerText = '♬ Stop Music';
  audioNextBtn.classList.remove('invisiable');
}

function stopAudio() {
  audioContainer.pause();
  playBtn.innerText = '♬ Play Music';
  audioNextBtn.classList.add('invisiable');
}

function loadAudio() {
  source.src = `audio/${currentAudio}.mp3`;
  audioContainer.load();
  playAudio();
}

function handlePlayBtnClick() {
  const state = playBtn.innerText;

  if (state === '♬ Play Music') {
    loadAudio();
  } else {
    stopAudio();
  }
}

function handleNextButtonClick() {
  if (currentAudio < MUSIC_COUNT) {
    currentAudio += 1;
  } else {
    currentAudio = 1;
  }
  audioContainer.pause();
  loadAudio();
}

playBtnContainer.addEventListener('click', handlePlayBtnClick);
audioNextBtn.addEventListener('click', handleNextButtonClick);
