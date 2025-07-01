let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];

function startQuiz() {
    const category = document.getElementById("category").value;
    const count = parseInt(document.getElementById("question-count").value);
    const categoryQuestions = questions[category] || [];
    selectedQuestions = shuffle(categoryQuestions).slice(0, count);
    score = 0;
    currentQuestionIndex = 0;
    showQuizScreen();
    showQuestion();
}

function startQuickQuiz() {
    let allQuestions = Object.values(questions).flat();
    selectedQuestions = shuffle(allQuestions).slice(0, 5);
    score = 0;
    currentQuestionIndex = 0;
    showQuizScreen();
    showQuestion();
}

function showQuizScreen() {
    document.getElementById("main-menu").classList.add("hidden");
    document.getElementById("quiz-screen").classList.remove("hidden");
    document.getElementById("result-screen").classList.add("hidden");
}

function showQuestion() {
    const questionObj = selectedQuestions[currentQuestionIndex];
    document.getElementById("question-number").textContent = 
        \`Question \${currentQuestionIndex + 1} of \${selectedQuestions.length}\`;
    document.getElementById("score-display").textContent = \`Score: \${score}\`;

    document.getElementById("question").textContent = questionObj.question;
    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";
    shuffle(questionObj.choices).forEach(choice => {
        const btn = document.createElement("button");
        btn.textContent = choice;
        btn.className = "answer-btn";
        btn.onclick = () => selectAnswer(btn, choice === questionObj.answer);
        answersDiv.appendChild(btn);
    });

    document.getElementById("next-btn").classList.add("hidden");
}

function selectAnswer(button, isCorrect) {
    const buttons = document.querySelectorAll(".answer-btn");
    buttons.forEach(btn => btn.disabled = true);
    if (isCorrect) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("incorrect");
        buttons.forEach(btn => {
            if (btn.textContent === selectedQuestions[currentQuestionIndex].answer) {
                btn.classList.add("correct");
            }
        });
    }
    document.getElementById("next-btn").classList.remove("hidden");
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");
    document.getElementById("final-score").textContent = 
        \`You scored \${score} out of \${selectedQuestions.length}.\`;
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}