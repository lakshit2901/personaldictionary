const form = document.getElementById('wordForm');
const wordList = document.getElementById('wordList');
const searchInput = document.getElementById('searchInput');

let dictionary = [];

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const word = document.getElementById('word').value.trim();
  const meaning = document.getElementById('meaning').value.trim();
  const sentence = document.getElementById('sentence').value.trim();

  if (word && meaning) {
    dictionary.push({ word, meaning, sentence });
    displayWords(dictionary);
    form.reset();
  }
});

searchInput.addEventListener('input', function () {
  const searchText = searchInput.value.toLowerCase();
  const filtered = dictionary.filter(item =>
    item.word.toLowerCase().includes(searchText)
  );
  displayWords(filtered);
});

function displayWords(words) {
  wordList.innerHTML = '';
  words.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>Word:</strong> ${item.word}<br>
      <strong>Meaning:</strong> ${item.meaning}<br>
      ${item.sentence ? `<strong>Example:</strong> ${item.sentence}<br>` : ''}
      <button onclick="editWord(${index})">Edit</button>
      <button onclick="deleteWord(${index})">Delete</button>
      <hr/>
    `;
    wordList.appendChild(li);
  });
}

function deleteWord(index) {
  dictionary.splice(index, 1);
  displayWords(dictionary);
}

function editWord(index) {
  const entry = dictionary[index];
  document.getElementById('word').value = entry.word;
  document.getElementById('meaning').value = entry.meaning;
  document.getElementById('sentence').value = entry.sentence;
  dictionary.splice(index, 1);
  displayWords(dictionary);
}
