// variables
var questionEl = document.getElementById("question-display")
//timer variables
var timerEl = document.getElementById("timer")
var secondsLeft = 10;
var secondsSubtract = 0;

function setTime() {
    var timerInterval =setInterval(function() {
        secondsLeft--;
        timerEl.textContent = "Time Remaining: " + secondsLeft;

        if(secondsLeft ===0) {
            clearInterval(timerInterval);
            sendMessage();
        }
    }, 1000)
}

function sendMessage() {
    questionEl.textContent = "Times up! You Lose!";
}

setTime();