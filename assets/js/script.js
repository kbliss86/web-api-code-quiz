// --Global Variable Start Here--
// html element variables
var questionEl = document.getElementById("question-display");
var startButEl = document.getElementById("start-button");
var optionOneEl = document.getElementById("option-one");
var optionTwoEl = document.getElementById("option-two");
var optionThreeEl = document.getElementById("option-three");
var optionFourEl = document.getElementById("option-four");
var scoreEl = document.getElementById("score");
var scoreBtnEl = document.getElementById("score-button");
// score variables
var score = 0;

//hide buttons on load
optionOneEl.style.display = "none";
optionTwoEl.style.display = "none";
optionThreeEl.style.display = "none";
optionFourEl.style.display = "none";

//timer variables
var timerEl = document.getElementById("timer");
var secondsLeft = 90;
var secondsSubtract = 0;

//question variables
var questionOne = {
    question: "What is the result of the following expression: 2 + 2?",
    options: ["Three", "Four", "Five", "Six"],
    correctOption: 1
};

var questionTwo = {
    question: "How do you declare a variable in JavaScript?",
    options:  ["var", "let", "const", "declare"],
    correctOption: 0
};

var questionThree = {
    question: "What is the output of the following code snippet?\n\console.log(typeof 'Hello');",
    options: ["number", "string", "boolean", "undefined"],
    correctOption: 1
};

var questionFour = {
    question: "Which method is used to add an element to the end of an array in JavaScript?",
    options:  ["push()", "pop()", "shift()", "unshift()"],
    correctOption: 0
};

var questionFive = {
    question: "What is the result of the following expression: 10 % 3?",
    options: ["Zero", "One", "Two", "Three"],
    correctOption: 2
};

var questionSix = {
    question: "How do you write a single-line comment in JavaScript?",
    options: ["/* Comment */", "// Comment", "<!-- Comment -->", "# Comment"],
    correctOption: 1
};

var questionSeven = {
    question: "What is the output of the following code snippet?\n\"console.log(2 === '2');",
    options: ["true", "false", "undefined", "NaN"],
    correctOption: 1
};

var questionEight = {
    question: "Which method is used to remove the last element from an array in JavaScript?",
    options:  ["push()", "pop()", "shift()", "unshift()"],
    correctOption: 1
};

var questionNine = {
    question: "How do you convert a string to lowercase in JavaScript?v",
    options: ["toLowerCase()", "toUpperCase()", "charAt()", "concat()"],
    correctOption: 0
};

var questionTen = {
    question: "What is the output of the following code snippet?\n\console.log(5 > 3 && 10 < 8);",
    options:  ["true", "false", "undefined", "NaN"],
    correctOption: 1
};

var questions = [questionOne, questionTwo, questionThree, questionFour, questionFive, questionSix, questionSeven, questionEight, questionNine, questionTen];
var questionsIndex = 0;
//--Global Variable End Here--

//--Function Start Here--
function setTime() {
    var timerInterval =setInterval(function() {
        secondsLeft--;
        timerEl.textContent = "Time Remaining: " + secondsLeft;

        if(secondsLeft ===0 || questionsIndex === questions.length) {
            clearInterval(timerInterval);
            timerEl.textContent = "Time Remaining: 0"
            sendMessage();
        }
    }, 1000);
}


function checkAnswers(selectedIndex) {
    var currentQuestion = questions[questionsIndex];
    if (selectedIndex === currentQuestion.correctOption) {
        score+= secondsLeft;
    } else {
        secondsLeft-= 10;
    }
    questionsIndex++;
    scoreEl.textContent = "Score: " + score;
    if(secondsLeft ===0 || questionsIndex === questions.length) {
        addHighScore();
    } else {
    startGame();
    };
}


function sendMessage() {
    questionEl.textContent = "Game Over!";
}

function addHighScore() {
    var highscores = {};
if (JSON.parse(localStorage.getItem("highscores")) !== null) {
    highscores = JSON.parse(localStorage.getItem("highscores"))
        }   
    if (window.confirm("would you like to add your score to the high scores list?")) {
        var name = prompt("What is your initials");
        highscores[name] = score;
        localStorage.setItem("highscores", JSON.stringify(highscores));
        }
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
    startButEl.style.display = "none";
    if (questionsIndex < questions.length && secondsLeft > 0) {
       var currentQuestion = questions[questionsIndex];
       questionEl.textContent = currentQuestion.question;
        
        optionOneEl.textContent = currentQuestion.options[0];
        optionOneEl.style.display = "block";
        
        optionTwoEl.textContent = currentQuestion.options[1];
        optionTwoEl.style.display = "block";
        
        optionThreeEl.textContent = currentQuestion.options[2];
        optionThreeEl.style.display = "block";
        
        optionFourEl.textContent = currentQuestion.options[3];
        optionFourEl.style.display = "block";
                
        } else {
        sendMessage();  
        }  
}

startButEl.addEventListener("click", function() {
    startGame();
    setTime();
    eventListenerAdd();
});

scoreBtnEl.addEventListener("click", function() {
    var highscores = JSON.parse(localStorage.getItem("highscores"));
    if (highscores !== null && Object.keys(highscores).length > 0) {
        var message = "High Scores:\n\n";
        for (var name in highscores) {
            var score = highscores[name];
            message += name + ": " + score + "\n";
        }
        alert(message);
    }   else {
        alert("No High Scores to Display");
    }
});