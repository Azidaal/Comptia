const container = document.getElementById("category-container");
const grouped = {};

questions.forEach(q => {
  if (!grouped[q.category]) grouped[q.category] = [];
  grouped[q.category].push(q);
});

for (const cat in grouped) {
  const section = document.createElement("div");
  section.innerHTML = `<h2>Category ${cat}</h2>`;
  grouped[cat].forEach(q => {
    const div = document.createElement("div");
    div.innerHTML = `<p><strong>${q.question}</strong></p>`;
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
    section.appendChild(div);
  });
  container.appendChild(section);
}
