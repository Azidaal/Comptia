// Flashcards data, categorized by topic (only 1.1 example here)
const flashcards = [
  {
    category: "1.1 Laptop Hardware",
    question: "Why are laptops considered unique computing environments?",
    answers: [
      "They are designed to fit a specific form factor",
      "They use desktop parts",
      "They never need repairs",
      "They don’t have batteries"
    ],
    correct: 0
  },
  {
    category: "1.1 Laptop Hardware",
    question: "What type of batteries are commonly used in laptops?",
    answers: [
      "Nickel-cadmium batteries",
      "Lithium-ion or lithium-ion polymer batteries",
      "Lead-acid batteries",
      "Alkaline batteries"
    ],
    correct: 1
  },
  {
    category: "1.1 Laptop Hardware",
    question: "What is a common form factor for laptop memory?",
    answers: [
      "DIMM",
      "SO-DIMM",
      "Micro-DIMM",
      "Mini-DIMM"
    ],
    correct: 1
  },
  {
    category: "1.1 Laptop Hardware",
    question: "How can you access modular batteries in many laptops?",
    answers: [
      "By opening the entire laptop",
      "By sliding and unlocking switches on the battery",
      "By removing the keyboard",
      "By detaching the display"
    ],
    correct: 1
  },
  {
    category: "1.1 Laptop Hardware",
    question: "What is an advantage of SSDs over traditional hard drives?",
    answers: [
      "They have moving parts",
      "They are cheaper",
      "They have faster read/write speeds",
      "They use more power"
    ],
    correct: 2
  },
  // add more cards here...
];

// Utility to get URL parameters
function getParam(param) {
  const url = new URL(window.location);
  return url.searchParams.get(param);
}

const questionContainer = document.getElementById('question-container');
const answersContainer = document.getElementById('answers-container');
const nextBtn = document.getElementById('next-btn');
const customOptions = document.getElementById('custom-options');
const numQuestionsInput = document.getElementById('numQuestions');
const startCustomBtn = document.getElementById('startCustom');

let currentCards = [];
let currentIndex = 0;

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function loadCategories() {
  const categoriesList = document.getElementById('categories-list');
  if (!categoriesList) return;
  const categories = [...new Set(flashcards.map(c => c.category))];
  categoriesList.innerHTML = '';
  categories.forEach(cat => {
    const li = document.createElement('li');
    li.textContent = cat;
    li.onclick = () => {
      currentCards = flashcards.filter(c => c.category === cat);
      currentIndex = 0;
      sessionStorage.setItem('cards', JSON.stringify(currentCards));
      sessionStorage.setItem('index', currentIndex);
      window.location.href = 'quiz.html';
    };
    categoriesList.appendChild(li);
  });
}

function startQuiz(cards) {
  currentCards = cards;
  currentIndex = 0;
  showQuestion();
}

function showQuestion() {
  clearFeedback();
  nextBtn.style.display = 'none';
  answersContainer.innerHTML = '';
  if (currentIndex >= currentCards.length) {
    questionContainer.textContent = "Quiz complete! Well done.";
    return;
  }
  const card = currentCards[currentIndex];
  questionContainer.textContent = `${card.category} - Q${currentIndex + 1}: ${card.question}`;
  card.answers.forEach((answer, i) => {
    const btn = document.createElement('button');
    btn.textContent = answer;
    btn.onclick = () => selectAnswer(i);
    answersContainer.appendChild(btn);
  });
}

function clearFeedback() {
  Array.from(answersContainer.children).forEach(btn => {
    btn.disabled = false;
    btn.classList.remove('correct', 'wrong');
  });
}

function selectAnswer(selectedIndex) {
  const card = currentCards[currentIndex];
  const
