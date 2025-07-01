function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function renderQuiz(questionsSubset) {
  const container = document.getElementById("quiz-container");
  container.innerHTML = "";
  questionsSubset.forEach((q, index) => {
    const div = document.createElement("div");
    div.classList.add("question-block");
    div.innerHTML = `<h3>${index + 1}. ${q.question}</h3>`;
    q.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.onclick = () => {
        if (opt === q.answer) {
          btn.style.backgroundColor = "green";
        } else {
          btn.style.backgroundColor = "red";
        }
      };
      div.appendChild(btn);
    });
    container.appendChild(div);
  });
}

if (window.location.pathname.includes("quick.html")) {
  const quizSet = [...questions];
  shuffle(quizSet);
  renderQuiz(quizSet.slice(0, 15));
}

function startCustomTest() {
  const num = parseInt(document.getElementById("numQuestions").value);
  const quizSet = [...questions];
  shuffle(quizSet);
  renderQuiz(quizSet.slice(0, num));
}
