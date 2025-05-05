const wordForm = document.getElementById("wordForm");
const wordInput = document.getElementById("word");
const meaningInput = document.getElementById("meaning");
const exampleInput = document.getElementById("example");
const searchInput = document.getElementById("search");
const wordList = document.getElementById("wordList");

let words = JSON.parse(localStorage.getItem("words")) || [];

function displayWords(filteredWords = words) {
  wordList.innerHTML = "";
  filteredWords.forEach((wordObj, index) => {
    const div = document.createElement("div");
    div.className = "word-entry";
    div.innerHTML = `
      <p><strong>Word =</strong> ${wordObj.word}</p>
      <p><strong>Meaning =</strong> ${wordObj.meaning}</p>
      <p><strong>Sentence =</strong> ${wordObj.example || "—"}</p>
      <button onclick="editWord(${index})" style="font-size: 10px;">Edit</button>
      <button onclick="deleteWord(${index})" style="font-size: 10px;">Delete</button>
    `;
    wordList.appendChild(div);
  });
}

function saveToLocalStorage() {
  localStorage.setItem("words", JSON.stringify(words));
}

wordForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const word = wordInput.value.trim();
  const meaning = meaningInput.value.trim();
  const example = exampleInput.value.trim();

  if (word && meaning) {
    words.push({ word, meaning, example });
    saveToLocalStorage();
    displayWords();
    wordForm.reset();
  }
});

searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const filtered = words.filter(w => w.word.toLowerCase().includes(query));
  displayWords(filtered);
});

function deleteWord(index) {
  words.splice(index, 1);
  saveToLocalStorage();
  displayWords();
}

function editWord(index) {
  const wordObj = words[index];
  wordInput.value = wordObj.word;
  meaningInput.value = wordObj.meaning;
  exampleInput.value = wordObj.example;
  words.splice(index, 1);
  saveToLocalStorage();
  displayWords();
}

// Initial display
displayWords();
