'use strict';

const form = document.querySelector('.js-form'),
  input = form.querySelector('input'),
  greeting = document.querySelector('.js-grettings');

const USER_LS = 'currentUser',
  SHOWING_CN = 'showing';

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  if (!input.value) return;
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener('submit', handleSubmit);
}

function paintGreeting(text) {
  const currentHours = new Date().getHours();
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  if (currentHours > 5 && currentHours < 12) {
    greeting.innerText = `Good Morning, ${text}.`;
  } else if (currentHours > 11 && currentHours < 18) {
    greeting.innerText = `Good Afternoon, ${text}.`;
  } else {
    greeting.innerText = `Good Evening, ${text}.`;
  }
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
