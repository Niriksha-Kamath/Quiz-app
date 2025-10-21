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

// Display high score
const highscore = localStorage.getItem("highscore") || 0;
highscoreContainer.innerText = `🏆 High Score: ${highscore}`;

// Load quiz
function loadQuiz() {
  quizContainer.innerHTML = quizData.map((q, i) => `
    <div class="question">
      <h3>${i + 1}. ${q.question}</h3>
      ${q.options.map((opt, idx) =>
        `<label><input type="radio" name="q${i}" value="${idx}"> ${opt}</label>`
      ).join("")}
    </div>
  `).join("");
}

submitBtn.addEventListener("click", () => {
  let score = 0;

  quizData.forEach((q, i) => {
    const selected = document.querySelector(`input[name=q${i}]:checked`);
    if (selected && Number(selected.value) === q.answer) score++;
  });

  resultContainer.innerHTML = `You scored ${score} / ${quizData.length}`;
  
  if (score > highscore) {
    localStorage.setItem("highscore", score);
    highscoreContainer.innerText = `🏆 New High Score: ${score}`;
  }
});

loadQuiz();
