'use strict';

const HIDE = 'Hide';
const SHOW = 'Show';
const COLOR_RED = 'red';
const COLOR_GREEN = 'green';

const button = document.querySelector('.toggle-button');
button.addEventListener('click', handleButtonClick);

function handleButtonClick() {
  const sidebar = document.querySelector('.todo-wrap');
  const text = button.innerText;

  if (text === HIDE) {
    button.innerText = SHOW;
    button.style.backgroundColor = COLOR_RED;
    sidebar.style.right = '-30%';
  } else {
    button.innerText = HIDE;
    button.style.backgroundColor = COLOR_GREEN;
    sidebar.style.right = '0';
  }
}
