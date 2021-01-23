'use strict';

// const playBtnContainer = document.querySelector('.js-onOffWrap');
// const playBtn = document.querySelector('.js-audioOnOff');
// const audioNextBtn = document.querySelector('.js-audioNextBtn');

// let audio = new Audio('../audio/1.mp3');

// const MUSIC_COUNT = 5;

// let currentAudio = 1;
// let isPlaying = false;

// function playMusic() {
//   isPlaying = true;
//   audio.volume = 0.2;
//   audio.loop = true;
//   audio.play();
//   playBtn.innerText = '♬ Stop Music';
//   audioNextBtn.classList.remove('invisiable');
// }

// function pauseMusic() {
//   isPlaying = false;
//   audio.pause();
//   playBtn.innerText = '♬ Play Music';
//   audioNextBtn.classList.add('invisiable');
// }

// function handlePlayButtonClick() {
//   const state = playBtn.innerText;

//   if (state === '♬ Play Music') {
//     playMusic();
//   } else {
//     pauseMusic();
//   }
// }

// function handleNextButtonClick() {
//   if (!isPlaying) return;

//   if (currentAudio < MUSIC_COUNT) {
//     currentAudio += 1;
//   } else {
//     currentAudio = 1;
//   }
//   audio.pause();
//   audio = new Audio(`../audio/${currentAudio}.mp3`);
//   playMusic();
// }

// playBtnContainer.addEventListener('click', handlePlayButtonClick);
// audioNextBtn.addEventListener('click', handleNextButtonClick);

const playBtnContainer = document.querySelector('.js-onOffWrap');
const playBtn = document.querySelector('.js-audioOnOff');
const audioNextBtn = document.querySelector('.js-audioNextBtn');

function playAudio() {
  const audioContainer = document.querySelector('#audioContainer');
  var source = document.getElementById('audioSource');
  source.src = 'audio/1.mp3';
  audioContainer.load();

  audioContainer.play();
  playBtn.innerText = '♬ Stop Music';
  audioNextBtn.classList.remove('invisiable');
}

function stopAudio() {
  //   audioContainer.pause();
  //   playBtn.innerText = '♬ Play Music';
  //   audioNextBtn.classList.add('invisiable');
}

function handlePlayBtnClick() {
  const state = playBtn.innerText;

  if (state === '♬ Play Music') {
    playAudio();
  } else {
    stopAudio();
  }
}

playBtnContainer.addEventListener('click', handlePlayBtnClick);
