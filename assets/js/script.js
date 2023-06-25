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

//hide buttons on page load
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
    options: ["Three", "Four", "Five", "Six"], // answers to the question stored in an array
    correctOption: 1 //the array value for each correct answer
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

//--Functions Start Here--

// Timer function, starts a timer that decreases by the second and is displayed in the timer element in HTML 
function setTime() {
    var timerInterval =setInterval(function() {
        secondsLeft--;
        timerEl.textContent = "Time Remaining: " + secondsLeft;

        if(secondsLeft ===0 || questionsIndex === questions.length) {
            clearInterval(timerInterval);
            timerEl.textContent = "Time Remaining: 0" // when time runs out - timer reads 0 and discontinues the count down
            sendMessage();
        }
    }, 1000);
}

// checks the answers to the question by compairing what button the user selected 0-3 and what is listed as the correct option in the question Object 
function checkAnswers(selectedIndex) { //selected index refers to the number in the function when it is being called (checkAnswers(0))
    var currentQuestion = questions[questionsIndex];
    if (selectedIndex === currentQuestion.correctOption) {
        score+= secondsLeft; //if the answer is correct, it rewards points based on how much time is left
    } else {
        secondsLeft-= 10; // if the answer is wrong, it subtracts time from the remaining timer 
    }
    questionsIndex++; // variable for the startGame function so it changes to the next question in the array
    scoreEl.textContent = "Score: " + score;
    if(secondsLeft ===0 || questionsIndex === questions.length) { // if the seconds run out or the questions we are on matches the maximum number of questions available, the quiz ends and the option to add high score to list is presented becuase there are no more questions
        addHighScore(); // call add high score function
    } else {
    startGame(); // call start game function with the newly added question
    };
}

// function for alerting the user the game is over due to timer running out
function sendMessage() {
    questionEl.textContent = "Game Over!"; // when the timer runs out the question answer section is replaced with GAME OVER
}

//function for adding the high score for users to see the scores they have submitted
function addHighScore() {
    var highscores = {}; //sets highscores variable
if (JSON.parse(localStorage.getItem("highscores")) !== null) { // if high scores are already stored in local storage it pulls them from local and assigns them to the variable "highscores"
    highscores = JSON.parse(localStorage.getItem("highscores"))
        }   
    if (window.confirm("would you like to add your score to the high scores list?")) { //asks user if they want to submit high score
        var name = prompt("What is your initials"); // prompts user to input initials
        highscores[name] = score; // uses the initials they input as the "Name" in the name pair value for the highscores object and also adds in the score as the value
        localStorage.setItem("highscores", JSON.stringify(highscores)); // sends the high scores value to local storage with the name/score of the person that just played the quize
        }
    }   

// function to add event listeners to the buttons for the potential answers when the game starts, we want to set these up AFTER the user starts game so they do not trigger the checkAnswers or addhighScores functions
function eventListenerAdd() {
    optionOneEl.addEventListener("click", function(event) { // adds event listener for when a user clicks
        event.stopPropagation(); //prevents the cross pollination of clicks to other button objects in the main section
        checkAnswers(0); // calls the check answer function with the corresponding button they chose to compare it to the question array
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

// function begins the Game - displays the first or next question in the array depending on how many times the "checkAnswers" function has ran
function startGame() {
    startButEl.style.display = "none"; // removes start game button so it can no longer be clicked
    if (questionsIndex < questions.length && secondsLeft > 0) { //tests to see if there are still questions available in the array
       var currentQuestion = questions[questionsIndex]; //calls the quesiton based on the value in the question index (the question index is increased every time we check the users score)
       questionEl.textContent = currentQuestion.question;
        
        optionOneEl.textContent = currentQuestion.options[0]; //displays option from the question object based on its position in the array
        optionOneEl.style.display = "block";
        
        optionTwoEl.textContent = currentQuestion.options[1];
        optionTwoEl.style.display = "block";
        
        optionThreeEl.textContent = currentQuestion.options[2];
        optionThreeEl.style.display = "block";
        
        optionFourEl.textContent = currentQuestion.options[3];
        optionFourEl.style.display = "block";
                
        } else {
        sendMessage(); // if the questions index is higher than the total number of questions the game is over and the send message function is triggered
        }  
}

//event lsitener to start the game and timer and to add the event listeners to the buttons for the questions answers
startButEl.addEventListener("click", function() {
    startGame();
    setTime();
    eventListenerAdd();
});

//event listener to display the high scores 
scoreBtnEl.addEventListener("click", function() {
    var highscores = JSON.parse(localStorage.getItem("highscores"));
    if (highscores !== null && Object.keys(highscores).length > 0) { //checks to see if the highscores object in local storage has keys (values) present
        var message = "High Scores:\n\n"; // displays a message with a carriage break after the "high score"
        for (var name in highscores) {
            var score = highscores[name]; // loops through each key name in the high scores object and displays it with the corresponding score
            message += name + ": " + score + "\n";
        }
        alert(message); // displays the high scores in an alert
    }   else {
        alert("No High Scores to Display"); // if there are not high scores, display this message
    }
});