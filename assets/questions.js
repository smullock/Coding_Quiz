// Variables
var score = 0;
var questionIndex = 0;
var secondsLeft = 76;
var holdInterval = 0;
var penalty = 10;

// Array of questions
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    }
];

// DOM elements
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

// Event listener to start the timer
timer.addEventListener("click", startQuiz);

// Function to start the quiz
function startQuiz() {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    renderQuestion();
}

// Function to render a question
function renderQuestion() {
    var question = questions[questionIndex];

    questionsDiv.innerHTML = "";
    var userQuestion = question.title;
    var userChoices = question.choices;
    questionsDiv.textContent = userQuestion;

    var ulCreate = document.createElement("ul");
    userChoices.forEach(function (choice) {
        var listItem = document.createElement("li");
        listItem.textContent = choice;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", function () {
            compareAnswer(choice, question.answer);
        });
    });
}

// Function to compare the selected answer with the correct answer
function compareAnswer(selectedChoice, correctAnswer) {
    if (selectedChoice === correctAnswer) {
        score++;
        showMessage("That's Correct! The answer is: " + correctAnswer);
    } else {
        secondsLeft -= penalty;
        showMessage("That's Wrong! The correct answer is: " + correctAnswer);
    }

    questionIndex++;
    if (questionIndex >= questions.length) {
        allDone();
    } else {
        renderQuestion();
    }
}

// Function to display a message
function showMessage(message) {
    var createDiv = document.createElement("div");
    createDiv.setAttribute("id", "createDiv");
    createDiv.textContent = message;
    questionsDiv.appendChild(createDiv);
}

// Function to finish the quiz
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!";
    questionsDiv.appendChild(createH1);

    var timeRemaining = Math.max(secondsLeft, 0);
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");
    createP.textContent = "Your final score is: " + timeRemaining;
    questionsDiv.appendChild(createP);

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Please enter your initials: ";
    questionsDiv.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";
    questionsDiv.appendChild(createInput);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";
    questionsDiv.appendChild(createSubmit);

    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (!initials) {
            console.log("No value was entered!");
        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            };
            console.log(finalScore);
            var allScores = JSON.parse(localStorage.getItem("allScores")) || [];
            allScores.push(finalScore);
            localStorage.setItem("allScores", JSON.stringify(allScores));
            window.location.replace("./highscore.html");
        }
    });
}
