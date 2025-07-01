const flashcards = {
  "1.1": [
    {
      question: "Why are laptops often harder to repair than desktops?",
      answer: "Laptops have a compact, unique form factor and are harder to access and repair internally."
    },
    {
      question: "What are modular batteries in laptops?",
      answer: "Modular batteries can be removed and replaced without disassembling the laptop."
    },
    {
      question: "What battery types are common in laptops?",
      answer: "Lithium-ion and lithium-ion polymer batteries are commonly used."
    },
    {
      question: "What happens to a battery’s capacity over time?",
      answer: "Each charge cycle slightly reduces the total capacity; eventually, it must be replaced."
    },
    {
      question: "How is a laptop keyboard typically connected?",
      answer: "Via a single ribbon cable to the motherboard."
    },
    {
      question: "What is a SO-DIMM?",
      answer: "Small Outline Dual Inline Memory Module used for laptop memory upgrades."
    },
    {
      question: "Can all laptops upgrade RAM?",
      answer: "No, some have soldered RAM which can't be upgraded without replacing the motherboard."
    },
    {
      question: "What is the benefit of SSDs over HDDs in laptops?",
      answer: "SSDs are faster, more durable, and have no moving parts."
    },
    {
      question: "What are M.2 drives?",
      answer: "Compact SSDs that use M.2 interface, offering high-speed storage in a small form factor."
    },
    {
      question: "What is drive imaging used for in upgrades?",
      answer: "To clone an old drive to a new one, transferring OS, data, and apps easily."
    },
    {
      question: "How is wireless functionality integrated in laptops?",
      answer: "Via built-in chips or Mini PCI/PCIe cards for Wi-Fi, Bluetooth, and WWAN."
    },
    {
      question: "What is biometric authentication on laptops?",
      answer: "Using facial recognition or fingerprint scanning to log into the system."
    },
    {
      question: "What is NFC and how is it used in laptops?",
      answer: "Near-field communication allows for wireless authentication using phones or badges."
    }
  ]
};

let currentCategory = "1.1";
let currentIndex = 0;
let showingAnswer = false;

const questionDiv = document.getElementById("question");
const answerDiv = document.getElementById("answer");
const categorySelect = document.getElementById("category-select");

function loadCategories() {
  Object.keys(flashcards).forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = `Video ${cat}`;
    categorySelect.appendChild(option);
  });
  categorySelect.value = currentCategory;
  categorySelect.addEventListener("change", () => {
    currentCategory = categorySelect.value;
    currentIndex = 0;
    renderCard();
  });
}

function renderCard() {
  const card = flashcards[currentCategory][currentIndex];
  questionDiv.textContent = card.question;
  answerDiv.textContent = card.answer;
  answerDiv.classList.add("hidden");
  showingAnswer = false;
}

function flipCard() {
  showingAnswer = !showingAnswer;
  answerDiv.classList.toggle("hidden");
}

function nextCard() {
  if (currentIndex < flashcards[currentCategory].length - 1) {
    currentIndex++;
    renderCard();
  }
}

function prevCard() {
  if (currentIndex > 0) {
    currentIndex--;
    renderCard();
  }
}

loadCategories();
renderCard();
