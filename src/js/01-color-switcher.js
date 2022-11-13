const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);
const DELAY = 1000;
let intervalId;

function onStartBtnClick() {
  disableBtn();
  intervalId = setInterval(changeBodyBgColor, DELAY);
}

function onStopBtnClick() {
  enableBtn();
  clearInterval(intervalId);
}

function disableBtn() {
  document.querySelector('[data-start]').disabled = true;
  document.querySelector('[data-stop]').disabled = false;
}

function enableBtn() {
  document.querySelector('[data-stop]').disabled = true;
  document.querySelector('[data-start]').disabled = false;
}

function changeBodyBgColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
