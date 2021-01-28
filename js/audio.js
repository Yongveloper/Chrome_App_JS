'use strict';

const audioContainer = document.querySelector('#audioContainer');
const playBtnContainer = document.querySelector('.js-onOffWrap');
const playBtn = document.querySelector('.js-audioOnOff');
const audioNextBtn = document.querySelector('.js-audioNextBtn');
const audioCountDisplay = document.querySelector('.js-audioNumDisplay');
const audioTime = document.querySelector('.js-audioTime');

const MUSIC_COUNT = 5;
const PLAY_MUSIC = '♬ Play BGM';
const STOP_MUSIC = '♬ Stop BGM';
const AUDIO_VOLUME = 0.2;
const INVISABLE = 'invisiable';
const START_TIME = 0;

let isPlaying = false;
let currentAudio = 1;
let timerInterval;
let time = START_TIME;

async function playAudio() {
  playBtn.innerText = STOP_MUSIC;
  audioNextBtn.classList.remove(INVISABLE);
  audioCountDisplay.classList.remove(INVISABLE);
  audioContainer.volume = AUDIO_VOLUME;
  audioContainer.loop = false;
  await audioContainer.play();
  timerInterval = setInterval(increaseAudioTimer, 1000);
}

function stopAudio() {
  isPlaying = false;
  playBtn.innerText = PLAY_MUSIC;
  audioNextBtn.classList.add(INVISABLE);
  audioCountDisplay.classList.add(INVISABLE);
  audioContainer.pause();
  resetAudioTimer();
}

function loadAudio() {
  isPlaying = true;
  const source = document.querySelector('#audioSource');
  source.src = `audio/${currentAudio}.mp3`;
  audioContainer.load();
  playAudio();
}

function handlePlayBtnClick() {
  if (isPlaying) {
    stopAudio();
  } else {
    loadAudio();
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
  resetAudioTimer();
  loadAudio();
}

function increaseAudioTimer() {
  time++;
  let mins = Math.floor((time % 3600) / 60);
  let secs = (time % 3600) % 60;

  audioTime.innerHTML = `${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`;
}

function resetAudioTimer() {
  clearInterval(timerInterval);
  time = START_TIME;
  audioTime.innerHTML = '00:00';
}

playBtnContainer.addEventListener('click', handlePlayBtnClick);
audioNextBtn.addEventListener('click', loadNextAudio);
audioContainer.addEventListener('ended', loadNextAudio);
