const quizData = [
  {
    question: "What does OWASP stand for?",
    options: [
      "Open Web Application Security Project",
      "Online Web App Security Protocol",
      "Over Web Application Security Project",
      "Open Wide Application Safety Program"
    ],
    answer: 0
  },
  {
    question: "Which vulnerability allows attackers to inject malicious SQL?",
    options: ["CSRF", "XSS", "SQL Injection", "Broken Access Control"],
    answer: 2
  },
  {
    question: "Which tool is commonly used for network packet analysis?",
    options: ["Wireshark", "Burp Suite", "Nmap", "Metasploit"],
    answer: 0
  },
  {
    question: "What is the main purpose of a firewall?",
    options: [
      "Encrypt passwords",
      "Monitor incoming/outgoing traffic",
      "Scan for malware",
      "Host web servers"
    ],
    answer: 1
  }
];

let quizContainer = document.getElementById("quiz");
let submitBtn = document.getElementById("submit");
let resultContainer = document.getElementById("result");
let highscoreContainer = document.getElementById("highscore");
let timerContainer = document.getElementById("timer");

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;

// Display stored high score
const highscore = localStorage.getItem("highscore") || 0;
highscoreContainer.innerText = `🏆 High Score: ${highscore}`;

// Load a single question at a time
function loadQuestion() {
  const q = quizData[currentQuestion];
  quizContainer.innerHTML = `
    <div class="question">
      <h3>${currentQuestion + 1}. ${q.question}</h3>
      ${q.options
        .map(
          (opt, idx) =>
            `<label><input type="radio" name="answer" value="${idx}"> ${opt}</label>`
        )
        .join("")}
    </div>
    <p id="timer">⏱️ Time left: <span id="time">${timeLeft}</span> seconds</p>
  `;
  startTimer();
}

function startTimer() {
  clearInterval(timer);
  timeLeft = 10;
  document.getElementById("time").innerText = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion(); // move automatically when time runs out
    }
  }, 1000);
}

function nextQuestion() {
  clearInterval(timer);

  const selected = document.querySelector("input[name=answer]:checked");
  if (selected && Number(selected.value) === quizData[currentQuestion].answer) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timer);
  quizContainer.innerHTML = `<h2>Quiz Over!</h2>
  <p>You scored ${score} / ${quizData.length}</p>`;

  if (score > highscore) {
    localStorage.setItem("highscore", score);
    highscoreContainer.innerText = `🏆 New High Score: ${score}`;
  }

  submitBtn.style.display = "none";
  resultContainer.innerText = "";
}

// Button click moves to next question manually (optional)
submitBtn.addEventListener("click", nextQuestion);

// Start quiz
loadQuestion();
