'use strict';

const audioContainer = document.querySelector('#audioContainer');
const playBtnContainer = document.querySelector('.js-onOffWrap');
const playBtn = document.querySelector('.js-audioOnOff');
const audioNextBtn = document.querySelector('.js-audioNextBtn');
const audioCountDisplay = document.querySelector('.js-audioNumDisplay');

const MUSIC_COUNT = 5;

let currentAudio = 1;

function playAudio() {
  audioContainer.volume = 0.2;
  audioContainer.loop = true;
  audioContainer.play();
  playBtn.innerText = '♬ Stop BGM';
  audioNextBtn.classList.remove('invisiable');
  audioCountDisplay.classList.remove('invisiable');
}

function stopAudio() {
  audioContainer.pause();
  playBtn.innerText = '♬ Play BGM';
  audioNextBtn.classList.add('invisiable');
  audioCountDisplay.classList.add('invisiable');
}

function loadAudio() {
  const source = document.querySelector('#audioSource');
  source.src = `audio/${currentAudio}.mp3`;
  audioContainer.load();
  playAudio();
}

function handlePlayBtnClick() {
  const state = playBtn.innerText;

  if (state === '♬ Play BGM') {
    loadAudio();
  } else {
    stopAudio();
  }
}

function handleNextButtonClick() {
  const audioNum = document.querySelector('.js-audioNum');

  if (currentAudio < MUSIC_COUNT) {
    currentAudio += 1;
  } else {
    currentAudio = 1;
  }

  audioNum.innerText = currentAudio;
  audioContainer.pause();
  loadAudio();
}

playBtnContainer.addEventListener('click', handlePlayBtnClick);
audioNextBtn.addEventListener('click', handleNextButtonClick);
