// variables
var questionEl = document.getElementById("question-display");
var startButEl = document.getElementById("start-button");
var optionOneEl = document.getElementById("option-one");
var optionTwoEl = document.getElementById("option-two");
var optionThreeEl = document.getElementById("option-three");
var optionFourEl = document.getElementById("option-four");
var scoreEl = document.getElementById("score");
// score variables
var score = 0;

//hide buttons on load
optionOneEl.style.display = "none";
optionTwoEl.style.display = "none";
optionThreeEl.style.display = "none";
optionFourEl.style.display = "none";

//timer variables
var timerEl = document.getElementById("timer");
var secondsLeft = 60;
var secondsSubtract = 0;

//question variables
var questionOne = {
    question: "What is 1+1",
    options: ["Three", "Five", "Two", "Four"],
    correctOption: 2
};

var questionTwo = {
    question: "How do you Spell the word CODE",
    options: ["COD", "CODE", "CODY", "CO"],
    correctOption: 1
};

var questionThree = {
    question: "What is the Pro football team in Chicago",
    options: ["LIONS", "SEALS", "BIRDS", "BEARS"],
    correctOption: 3
};

var questionFour = {
    question: "What is bigger than a pond but smaller than a ocean",
    options: ["LAKE", "PUDDLE", "SOUND", "BAY"],
    correctOption: 0
};

var questionFive = {
    question: "What gets wet as it dries",
    options: ["acorn", "grass", "towel", "paint"],
    correctOption: 2
};

var questions = [questionOne, questionTwo, questionThree, questionFour, questionFive];
var questionsIndex = 0;

function setTime() {
    var timerInterval =setInterval(function() {
        secondsLeft--;
        timerEl.textContent = "Time Remaining: " + secondsLeft;

        if(secondsLeft ===0) {
            clearInterval(timerInterval);
            sendMessage();
        }
    }, 1000);
}


function checkAnswers(selectedIndex) {
    var currentQuestion = questions[questionsIndex];
    if (selectedIndex === currentQuestion.correctOption) {
        score+= 10;
    } else {
        secondsLeft-= 10;
    }
    console.log(currentQuestion.question);
    console.log(currentQuestion.options);
    console.log(currentQuestion.correctOption);
    console.log(selectedIndex);
    questionsIndex++;
    startGame();
    scoreEl.textContent = "Score: " + score;
}


function sendMessage() {
    questionEl.textContent = "Game Over! Your Score Was: " + score;
}


function eventListenerAdd() {
    optionOneEl.addEventListener("click", function(event) {
        event.stopPropagation();
        checkAnswers(0);
      });
    
      optionTwoEl.addEventListener("click", function(event) {
        event.stopPropagation();
        checkAnswers(1);
      });
    
      optionThreeEl.addEventListener("click", function(event) {
        event.stopPropagation();
        checkAnswers(2);
      });
    
      optionFourEl.addEventListener("click", function(event) {
        event.stopPropagation();
        checkAnswers(3);
      }); 
}

function startGame() {
    if (questionsIndex < questions.length && secondsLeft > 0) {
       var currentQuestion = questions[questionsIndex];
       questionEl.textContent = currentQuestion.question;
        
        optionOneEl.textContent = currentQuestion.options[0];
        optionOneEl.style.display = "block";
        // optionOneEl.addEventListener("click", function() {  
        // checkAnswsers(0);
        // });
        
        optionTwoEl.textContent = currentQuestion.options[1];
        optionTwoEl.style.display = "block";
        // optionTwoEl.addEventListener("click", function() {
        // checkAnswsers(1);
        // });
        
        optionThreeEl.textContent = currentQuestion.options[2];
        optionThreeEl.style.display = "block";
        // optionThreeEl.addEventListener("click", function() {
        // checkAnswsers(2);
        // });
        
        optionFourEl.textContent = currentQuestion.options[3];
        optionFourEl.style.display = "block";
        // optionFourEl.addEventListener("click", function() {
        // // checkAnswsers(3);
        // // });
                
        } else sendMessage();     
}

startButEl.addEventListener("click", function() {
    startGame();
    setTime();
    eventListenerAdd();
});