// Imported libraries
import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Additional import of styles
import 'flatpickr/dist/flatpickr.min.css';

// console.log(flatpickr);
// console.log(Notiflix);

const refs = {
  dateInput: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('button[data-start]'),
  daysSpan: document.querySelector('span[data-days]'),
  hoursSpan: document.querySelector('span[data-hours]'),
  minutesSpan: document.querySelector('span[data-minutes]'),
  secondsSpan: document.querySelector('span[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDates = Date.parse(refs.dateInput.value);
    const currentTime = options.defaultDate.getTime();

    if (currentTime > selectedDates) {
      Notify.failure('Please choose a date in the future');
      refs.startButton.setAttribute('disabled', 'true');
      return;
    }
    Notify.success('Congratulations! You can start your Timer!');
    refs.startButton.removeAttribute('disabled');
    refs.startButton.addEventListener('click', onStartBtnClick);
  },
};

flatpickr("input[type = 'text']", options);

function onStartBtnClick() {
  timer.start();
}

const timer = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }

    const selectTime = Date.parse(refs.dateInput.value);
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const onlineTime = Date.now();
      const timeDifference = selectTime - onlineTime;
      if (timeDifference < 1000) {
        clearInterval(this.intervalId);
        refs.startButton.setAttribute('disabled', 'true');
      }
      const time = convertMs(timeDifference);
      updateTimePickerFace(time);
    }, 1000);
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimePickerFace({ days, hours, minutes, seconds }) {
  refs.daysSpan.textContent = `${days}`;
  refs.hoursSpan.textContent = `${hours}`;
  refs.minutesSpan.textContent = `${minutes}`;
  refs.secondsSpan.textContent = `${seconds}`;
}
