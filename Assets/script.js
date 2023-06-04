// script.js
// questions array
const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [ "1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above", ],
    answer: "4. all of the above",
  },
  {
    questionText: "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
  },
  {
    questionText: "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [ "1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log", ],
    answer: "4. console.log",
  },
  {
    questionText: "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break",
  },
];

// html elements
const startCard = document.getElementById("start-card");
const quizCard = document.getElementById("quiz-card");
const endCard = document.getElementById("end-card");
const optionsCard = document.getElementById("options-card");
const questionText = document.getElementById("question");
const responseText = document.getElementById("answer-response");
const timeRemaining = document.getElementById("time-remaining");
const resultsAppend = document.getElementById("results");
const initialsInput = document.getElementById("initials");
const submitButton = document.getElementById("submit-button");
const highscoresButton = document.getElementById("highscores-button");
// start button event listener
document.getElementById("start-button").addEventListener("click", startQuiz);
document.querySelectorAll(".option-button").forEach((Button) => {
  Button.addEventListener("click", checkAnswer);
});
// highscores button event listener
highscoresButton.addEventListener("click", () => {
  window.location.href = "highscores.html";
});
// start quiz
function startQuiz() {
  startCard.style.display = "none";
  quizCard.style.display = "block";
  timeRemaining.textContent = timeLeft;
  startTimer();
  showQuestion();
}

let timeLeft = 60;
let timerInterval;
// function for timer
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timeRemaining.textContent = timeLeft;
    // force quit when time runs out
    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}
// function to show questions
function showQuestion() {
  const question = questions[currentQuestionIndex];
  questionText.textContent = question.questionText;
  optionsCard.innerHTML = "";
  question.options.forEach((option) => {
    const optionButton = document.createElement("button");
    optionButton.textContent = option;
    optionButton.classList.add("option-button");
    optionsCard.appendChild(optionButton);
    optionButton.addEventListener("click", checkAnswer);
  });
}

let currentQuestionIndex = 0;
// function to check users input
function checkAnswer(e) {
  const selectedOption = e.target.textContent;
  const question = questions[currentQuestionIndex];
  if (selectedOption === question.answer) {
    responseText.textContent = "Correct!";
  } else {
    responseText.textContent = "Wrong!";
    timeLeft -= 10;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}
// end quiz function
function endQuiz() {
  clearInterval(timerInterval);
  quizCard.style.display = "none";
  endCard.style.display = "block";
  resultsAppend.textContent = timeLeft;
}
// function to submit scores to highscores.html
function submitScore() {
  const initials = initialsInput.value.trim();
  if (initials === "") {
    alert("Please enter your initials.");
  } else {
    const score = {
      initials: initials,
      score: timeLeft,
    };
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push(score);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.href = "highscores.html";
  }
}
submitButton.addEventListener("click", submitScore);