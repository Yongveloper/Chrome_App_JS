'use strict';

const audioContainer = document.querySelector('#audioContainer');
const playBtnContainer = document.querySelector('.js-onOffWrap');
const playBtn = document.querySelector('.js-audioOnOff');
const audioNextBtn = document.querySelector('.js-audioNextBtn');
const audioCountDisplay = document.querySelector('.js-audioNumDisplay');

const MUSIC_COUNT = 5;
const PLAY_MUSIC = '♬ Play BGM';
const STOP_MUSIC = '♬ Stop BGM';
const AUDIO_VOLUME = 0.2;
const INVISABLE = 'invisiable';

let currentAudio = 1;

async function playAudio() {
  playBtn.innerText = STOP_MUSIC;
  audioNextBtn.classList.remove(INVISABLE);
  audioCountDisplay.classList.remove(INVISABLE);
  audioContainer.volume = AUDIO_VOLUME;
  audioContainer.loop = false;
  await audioContainer.play();
  var minutes = parseInt(audioContainer.duration / 60, 10);
  var seconds = parseInt(audioContainer.duration % 60);
  console.log(minutes, seconds);
}

function stopAudio() {
  audioContainer.pause();
  playBtn.innerText = PLAY_MUSIC;
  audioNextBtn.classList.add(INVISABLE);
  audioCountDisplay.classList.add(INVISABLE);
}

function loadAudio() {
  const source = document.querySelector('#audioSource');
  source.src = `audio/${currentAudio}.mp3`;
  audioContainer.load();
  playAudio();
}

function handlePlayBtnClick() {
  const state = playBtn.innerText;

  if (state === PLAY_MUSIC) {
    loadAudio();
  } else {
    stopAudio();
  }
}

function loadNextAudio() {
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
audioNextBtn.addEventListener('click', loadNextAudio);
audioContainer.addEventListener('ended', loadNextAudio);
