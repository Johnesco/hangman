var input = $('#input'); // text area for input
var man = $('#man'); // Hangman drawing
var wordDisplay = $('#wordDisplay'); // word guessed so far display
var gameState = $('#gameState'); // win or lose section
var keyboard = $('#keyboard'); // win or lose section

var guesses = 0; // Number of wrong guesses made
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'x', 'z'];
var wordlist = ["wisper", "yodel", "whisky", "popcorn", "shogun", "easter","taxonomy","bluebird","dynamic"];

var hangmanArt = // each line counts as a guess
  [
    [" | \n"],
    ["(_)\n"],
    ["\\|/\n"],
    [" | \n"],
    ["/ \\\n"]
  ];


// Converts word into word object to be guessed
function createWord(phrase) { 
  word = [];
  for (var i = 0; i < phrase.length; i++) {
    word.push([phrase[i], false])
  }
}

function createKeyboard(alphabet) {
  
  for (var i = 0; i < alphabet.length; i++) {
    var letter = alphabet[i];
    var key = $("<div></div>").addClass('key');
    key.html(letter);
    keyboard.append(key);
    if ( i%9 === 8 ){
      keyboard.append("<br>");
    }
  }
  
  keyboard.click(function (e) {
      var $target = $(e.target);
      var targetLetter = $target.text(); //e.target.innerHTML;
      guess(targetLetter);
    })
}

// Takes letter and checks to see if word object contains it
function guess(letter) { 
  letterFound = false;
  console.log(letter);
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
createKeyboard(alphabet);
createWord(wordlist[Math.floor(Math.random() * wordlist.length)]);
drawMan();
drawWord();