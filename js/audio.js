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
let timerInterval = null;
let time = START_TIME;

function handlePlayBtnClick() {
  if (isPlaying) {
    stopAudio();
  } else {
    loadAudio();
  }
}

function stopAudio() {
  isPlaying = false;
  playBtn.innerText = PLAY_MUSIC;
  audioNextBtn.classList.add(INVISABLE);
  audioCountDisplay.classList.add(INVISABLE);
  audioContainer.pause();
  resetAudioTimer();
}

function resetAudioTimer() {
  clearInterval(timerInterval);
  time = START_TIME;
  displayAudioTime(0, 0);
}

function displayAudioTime(mins, secs) {
  audioTime.innerHTML = `${mins < 10 ? `0${mins}` : mins}:${
    secs < 10 ? `0${secs}` : secs
  }`;
}

function loadNextAudio() {
  const audioNum = document.querySelector('.js-audioNum');

  if (currentAudio < MUSIC_COUNT) {
    currentAudio++;
  } else {
    currentAudio = 1;
  }

  audioNum.innerText = currentAudio;
  audioContainer.pause();
  resetAudioTimer();
  loadAudio();
}

function loadAudio() {
  const source = document.querySelector('#audioSource');
  source.src = `audio/${currentAudio}.mp3`;
  isPlaying = true;
  audioContainer.load();
  playAudio();
}

async function playAudio() {
  playBtn.innerText = STOP_MUSIC;
  audioNextBtn.classList.remove(INVISABLE);
  audioCountDisplay.classList.remove(INVISABLE);
  audioContainer.volume = AUDIO_VOLUME;
  audioContainer.loop = false;
  await audioContainer.play();
  timerInterval = setInterval(increaseAudioTimer, 1000);
}

function increaseAudioTimer() {
  time++;
  const { mins, secs } = getPlayTime();
  displayAudioTime(mins, secs);
}

function getPlayTime() {
  const mins = Math.floor((time % 3600) / 60);
  const secs = (time % 3600) % 60;

  return { mins, secs };
}

playBtnContainer.addEventListener('click', handlePlayBtnClick);
audioNextBtn.addEventListener('click', loadNextAudio);
audioContainer.addEventListener('ended', loadNextAudio);
