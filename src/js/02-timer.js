import flatpickr from "flatpickr";
import "flatpickr/dist/themes/material_orange.css";
import Notiflix from 'notiflix';

const timer = document.querySelector(".timer");
const daysValue = timer.querySelector('[data-days]');
const hoursValue = timer.querySelector('[data-hours]');
const minutesValue = timer.querySelector('[data-minutes]');
const secondsValue = timer.querySelector('[data-seconds]');
const startBtn = document.querySelector('[data-start]');

let endDate;
let intervalId;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
            Notiflix.Notify.failure("Please choose a date in the future");
            startBtn.disabled = true;
        } else {
            startBtn.disabled = false;
            endDate = selectedDates[0];
        }
        console.log(selectedDates[0]);
    },
};

flatpickr("#datetime-picker", options);

startBtn.addEventListener("click", () => {
    clearInterval(intervalId);
    intervalId = setInterval(updateCountdown, 1000);
});

function updateCountdown() {
    const timeLeft = endDate - new Date();
    if (timeLeft <= 0) {
        clearInterval(intervalId);
        daysValue.textContent = "00";
        hoursValue.textContent = "00";
        minutesValue.textContent = "00";
        secondsValue.textContent = "00";
        return;
    }
    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    daysValue.textContent = padNumber(days);
    hoursValue.textContent = padNumber(hours);
    minutesValue.textContent = padNumber(minutes);
    secondsValue.textContent = padNumber(seconds);
}

function padNumber(number) {
    return number.toString().padStart(2, "0");
}

function convertMs(ms) {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const hours = Math.floor((ms / 1000 / 60 / 60) % 24);
    const days = Math.floor(ms / 1000 / 60 / 60 / 24);
    return { days, hours, minutes, seconds };
}
