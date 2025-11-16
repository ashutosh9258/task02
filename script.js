// DOM Element References
const displayMinutes = document.getElementById('minutes');
const displaySeconds = document.getElementById('seconds');
const displayMilliseconds = document.getElementById('milliseconds');
const startPauseBtn = document.getElementById('startPauseBtn');
const lapResetBtn = document.getElementById('lapResetBtn');
const lapList = document.getElementById('lapList');

// Stopwatch Variables
let startTime;
let updatedTime;
let difference;
let timerInterval;
let isRunning = false;
let lapCounter = 0;

// Function to format time (add leading zeros)
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Function to start or pause the stopwatch
function startPause() {
    if (!isRunning) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateDisplay, 10); // Update every 10ms
        isRunning = true;
        startPauseBtn.textContent = 'Pause';
        startPauseBtn.classList.add('paused');
        lapResetBtn.textContent = 'Lap';
        lapResetBtn.disabled = false;
    } else {
        clearInterval(timerInterval);
        isRunning = false;
        startPauseBtn.textContent = 'Start';
        startPauseBtn.classList.remove('paused');
        lapResetBtn.textContent = 'Reset';
    }
}

// Function to update the time display
function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10); // Get two digits

    displayMinutes.textContent = formatTime(minutes);
    displaySeconds.textContent = formatTime(seconds);
    displayMilliseconds.textContent = formatTime(milliseconds);
}

// Function to handle Lap or Reset
function lapReset() {
    if (isRunning) {
        // Lap functionality
        lapCounter++;
        const lapTime = `${displayMinutes.textContent}:${displaySeconds.textContent}.${displayMilliseconds.textContent}`;
        const lapItem = document.createElement('li');
        lapItem.innerHTML = `<span>Lap ${lapCounter}:</span> <span>${lapTime}</span>`;
        lapList.prepend(lapItem); // Add new laps to the top
    } else {
        // Reset functionality
        clearInterval(timerInterval);
        difference = 0;
        isRunning = false;
        startPauseBtn.textContent = 'Start';
        startPauseBtn.classList.remove('paused');
        lapResetBtn.textContent = 'Lap';
        lapResetBtn.disabled = true;
        displayMinutes.textContent = '00';
        displaySeconds.textContent = '00';
        displayMilliseconds.textContent = '00';
        lapCounter = 0;
        lapList.innerHTML = ''; // Clear lap list
    }
}

// Event Listeners
startPauseBtn.addEventListener('click', startPause);
lapResetBtn.addEventListener('click', lapReset);
