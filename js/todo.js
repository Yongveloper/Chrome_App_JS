'use strict';

const toDoForm = document.querySelector('.js-toDoForm'),
  toDoInput = toDoForm.querySelector('input'),
  pendingDisplay = document.querySelector('.js-toDoPending'),
  finishedDisplay = document.querySelector('.js-toDoFinished');

const PENDING_LS = 'PENDING';
const FINISHED_LS = 'FINISHED';

let toDos = [];
let finishedToDos = [];

function deleteToDo(event) {
  const li = event.path[1];
  pendingDisplay.removeChild(li);
  const cleanToDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  toDos = cleanToDos;
  saveLocalStorage(PENDING_LS, toDos);
}

function deleteFinished(event) {
  const li = event.path[1];
  finishedDisplay.removeChild(li);
  const cleanFinished = finishedToDos.filter((finish) => finish.id !== parseInt(li.id));
  finishedToDos = cleanFinished;
  saveLocalStorage(FINISHED_LS, finishedToDos);
}

function saveLocalStorage(ls, data) {
  localStorage.setItem(ls, JSON.stringify(data));
}

function getContent(event) {
  const li = event.path[1];
  const text = li.querySelector('span').innerText;
  return text;
}

function handleFinished(event) {
  const content = getContent(event);
  deleteToDo(event);
  paintFinished(content);
}

function handleToDo(event) {
  const content = getContent(event);
  deleteFinished(event);
  paintToDo(content);
}

function paintFinished(text, id = null) {
  const li = document.createElement('li');
  const delBtn = document.createElement('button');
  const moveBtn = document.createElement('button');
  const span = document.createElement('span');
  let newId = Date.now();

  if (id !== null) {
    newId = id;
  }

  delBtn.innerHTML = '❌';
  moveBtn.innerHTML = '⏪';
  delBtn.addEventListener('click', deleteFinished);
  moveBtn.addEventListener('click', handleToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(moveBtn);
  li.id = newId;
  finishedDisplay.appendChild(li);
  const finishedObj = {
    text: text,
    id: newId,
  };
  finishedToDos.push(finishedObj);
  saveLocalStorage(FINISHED_LS, finishedToDos);
}

function paintToDo(text, id = null) {
  const li = document.createElement('li');
  const delBtn = document.createElement('button');
  const moveBtn = document.createElement('button');
  const span = document.createElement('span');
  let newId = Date.now();

  if (id !== null) {
    newId = id;
  }
  delBtn.innerHTML = '❌';
  moveBtn.innerHTML = '✅';
  delBtn.addEventListener('click', deleteToDo);
  moveBtn.addEventListener('click', handleFinished);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(moveBtn);
  li.id = newId;
  pendingDisplay.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveLocalStorage(PENDING_LS, toDos);
}

function handleSubmit(event) {
  event.preventDefault();
  if (!toDoInput.value) return;
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = '';
}

function loadToDoList() {
  const loadedToDos = localStorage.getItem(PENDING_LS);
  const loadedFinished = localStorage.getItem(FINISHED_LS);

  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach((toDo) => paintToDo(toDo.text, toDo.id));
  }

  if (loadedFinished !== null) {
    const parsedToDos = JSON.parse(loadedFinished);
    parsedToDos.forEach((toDo) => paintFinished(toDo.text, toDo.id));
  }
}

function init() {
  loadToDoList();
  toDoForm.addEventListener('submit', handleSubmit);
}

init();
