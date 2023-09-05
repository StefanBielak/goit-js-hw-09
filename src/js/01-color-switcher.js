const body = document.body;
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

function startColorChange() {
    startBtn.disabled = true; 
    const intervalId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);

    stopBtn.addEventListener('click', () => {
        clearInterval(intervalId); 
        startBtn.disabled = false; 
    });
}

document.querySelector('[data-start]').addEventListener('click', startColorChange);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
