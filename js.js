let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".scoring-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

// Questions and Options array
const quizArray = [
    {
        id: "0",
        question: "Which is the most widely spoken language in India?",
        options: ["Hindi", "Marathi", "English", "Tamil"],
        correct: "Hindi",
    },
    {
        id: "1",
        question: "Which is the only continent in the world with the most area containing deserts?",
        options: ["North America", "Asia", "Africa", "Europe"],
        correct: "Africa",
    },
    {
        id: "2",
        question: " Which is the longest river in the world?",
        options: ["Great Ganga", "Nile", "Amazon", "Niger"],
        correct: "Nile",
    },
    {
        id: "3",
        question: " Name the National Heritage Animal of India?",
        options: ["Elephant", "Lion", "Tiger", "Zebra"],
        correct: "Elephant",
    },
    {
        id: "4",
        question: "Name the largest planet of our Solar System?",
        options: ["Jupiter", "Earth", "Venus", "Mars"],
        correct: "Jupiter",
    },
    {
        id: "5",
        question: "The main computer that stores the files that can be sent to computers that are networked together is:",
        options: ["Clip art", "Mother board", "Peripheral", "File server"],
        correct: "File server",
    }, {
        id: "6",
        question: "Which colour symbolises peace?",
        options: ["Red", "Green", "White", "Blue"],
        correct: "White",
    },
    {
        id: "7",
        question: "Google (www.google.com) is a:",
        options: ["Search Engine", "Number in Math", "Directory of images", "Chat service on the web"],
        correct: "Search Engine",
    },
    {
        id: "8",
        question: "Which is not an Internet protocol?",
        options: ["HTTP", "FTP", "STP", "IP"],
        correct: "STP",
    },
    {
        id: "9",
        question: "Tsunami is a word in which language?",
        options: ["Hindi", "Urdu", "Japanese", "French"],
        correct: "Japanese",
    },
];

// Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

// Next Button Click Event
nextBtn.addEventListener("click", () => {
    questionCount += 1;
    if (questionCount >= quizArray.length) {
        displayContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");
        userScore.innerHTML = "Your score is " + scoreCount + " out of " + quizArray.length;
    } else {
        countOfQuestion.innerHTML = (questionCount + 1) + " of " + quizArray.length + " questions";
        quizDisplay(questionCount);
        count = 11;
        clearInterval(countdown);
        timerDisplay();
    }
});

// Timer Display
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count === 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

// Display Quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    quizCards[questionCount].classList.remove("hide");
};

// Quiz Creation
function quizCreator() {
    quizArray.sort(() => Math.random() - 0.5);
    for (let i of quizArray) {
        i.options.sort(() => Math.random() - 0.5);
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " questions";
        let questionDiv = document.createElement("p");
        questionDiv.classList.add("question");
        questionDiv.innerHTML = i.question;
        div.appendChild(questionDiv);
        div.innerHTML += `
            <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
            <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
            <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
            <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
        `;
        quizContainer.appendChild(div);
    }
}

// Checker Function
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question = document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("right");
        scoreCount++;
    } else {
        userOption.classList.add("wrong");
        options.forEach((element) => {
            if (element.innerText === quizArray[questionCount].correct) {
                element.classList.add("right");
            }
        });
    }

    clearInterval(countdown);
    options.forEach((element) => {
        element.disabled = true;
    });
}

// Initial Setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

// Start Button Click Event
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

// Hide quiz and display start screen on window load
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};