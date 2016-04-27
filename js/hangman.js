var input = $('#input'); // text area for input
var man = $('#man'); // Hangman drawing
var wordDisplay = $('#wordDisplay'); // word guessed so far display
var gameState = $('#gameState'); // win or lose section

var guesses = 0; // Number of wrong guesses made
var wordlist = ["wisper", "yodel", "whisky", "popcorn", "shogun", "easter"];

var hangmanArt = // each line counts as a guess
  [
    [" | \n"],
    ["(_)\n"],
    ["\\|/\n"],
    [" | \n"],
    ["/ \\\n"]
  ];

function createWord(phrase) { // Takes a word and turns in into a word object to be guessed
  word = [];
  for (var i = 0; i < phrase.length; i++) {
    word.push([phrase[i], false])
  }
}

function getGuess() { // Takes letter from text box and calls "guess()" with it
  var letter = input.val();
  guess(letter);
}

function guess(letter) { // Takes letter and checks to see if word object contains it
  letterFound = false;
  for (var i = 0; i < word.length; i++) { // iterate through word for matches, change flag to true
    if (word[i][0] === letter) {
      letterFound = true;
      word[i][1] = true;
    }
  }

  if (!letterFound) { // if no letters are found, increment wrong guesses
    guesses++;
  }
  drawMan();
  drawWord();
  if (guesses > hangmanArt.length) {
    document.write("<h1>game over</h1>");
  } else if (isSolved()) {
    gameState.html("<h1>you win</h1>");
  }

}

function drawMan() {
  var hangmanstate = "";
  for (var i = 0; i < guesses; i++) {
    hangmanstate += hangmanArt[i];
  }

  hangman = "<pre>" + hangmanstate + "</pre>";
  man.html(hangman);
}

function drawWord() { // display on screen
  wordDisplay.html(makeWordString());
}

function isSolved() {
  for (var i = 0; i < word.length; i++) {
    if (word[i][1] === false) {
      return false;
    }
  }
  return true;
}

function makeWordString() { // iterate word object, show letter if true, dash if false.
  var wordString = "";
  for (var i = 0; i < word.length; i++) {
    if (word[i][1]) {
      wordString = wordString + word[i][0];
    } else {
      wordString = wordString + "_";
    }
  }
  return wordString;
}

// Main
createWord(wordlist[Math.floor(Math.random() * wordlist.length)]);
drawMan();
drawWord();

$('#guess').on('click', getGuess);