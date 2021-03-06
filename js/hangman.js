var $man = $('#man'); // Hangman drawing
var $wordDisplay = $('#wordDisplay'); // word guessed so far display
var $gameState = $('#gameState'); // win or lose section
var $keyboard = $('#keyboard'); // win or lose section
var $debug = $('#debug'); // win or lose section

var game = {
  gameState: "playing",

  badGuesses: 0,

  hangmanArt: [
    [" | \n"],
    ["(_)\n"],
    ["\\|/\n"],
    [" | \n"],
    ["/ \\\n"]
  ],

  word: [
    ["a", false]
  ],

  wordList: ["whisper", "yodel", "whisky", "popcorn", "shogun", "easter", "taxonomy", "bluebird", "dynamic", "pangaea", "mexico"],

  createWord: function(phrase) {
    game.word = [];
    for (var i = 0; i < phrase.length; i++) {
      game.word.push([phrase[i], false]);
      console.log(game.word);
    }
  },

  guess: function(letter) {
    letterFound = false;
    console.log(letter);
    for (var i = 0; i < game.word.length; i++) {
      if (game.word[i][0] === letter) {
        letterFound = true;
        game.word[i][1] = true;
      }
    }

    if (!letterFound) { // if no letters are found, increment wrong guesses
      game.badGuesses++;
    }
    game.updateGameState();
  },

  drawMan: function() {
    var hangmanstate = "";
    for (var i = 0; i < game.badGuesses; i++) {
      hangmanstate += game.hangmanArt[i];
    }

    hangman = "<pre>" + hangmanstate + "</pre>";
    $man.html(hangman);
  },

  drawWord: function() { // display on screen
    $wordDisplay.html(game.makeWordString());
  },

  makeWordString: function() { // iterate word object, show letter if true, dash if false.
    var wordString = "";
    for (var i = 0; i < game.word.length; i++) {
      if (game.word[i][1]) {
        wordString = wordString + game.word[i][0];
      } else {
        wordString = wordString + "_";
      }
    }
    return wordString;
  },

  isSolved: function() {
    for (var i = 0; i < game.word.length; i++) {
      if (game.word[i][1] === false) {
        return false;
      }
    }
    return true;
  },

  updateGameState: function() {

    // While State is "playing" check for win or loss.
    if (game.gameState === "playing"){
      if (game.badGuesses >= game.hangmanArt.length) { //end game as loss
        game.gameState = "lost";
        game.drawMan();
      } else if (game.isSolved()) { // end game as win
        game.gameState = "won";
      } 
    }

    // After determining Game State, execute update per state.
    switch(game.gameState) {
    case "playing":
        {
          game.drawMan();
          game.drawWord();
          $gameState.html("<h1>Guess a letter!</h1>");
        }
        break;
    case "won":
        {
          game.drawWord();
          $gameState.html("<h1>You Win</h1>");
        }
        break;
    case "lost":
        {
          $gameState.html("<h1>Game Over</h1>");}
        }

    $debug.html(
               "<h3>Debug info</h3>" +
               "<b>Game State: </b>" + game.gameState +
               "<br><b>Wrong Guesses: </b>" + game.badGuesses +
               "<br><b>Word To Guess Object:</b>" + game.word
               );
  },

  reset: function() {
    game.createWord(game.wordList[Math.floor(Math.random() * game.wordList.length)]);
    game.gameState = "playing";
    game.badGuesses = 0;
    game.updateGameState();
  }
};

var keyboardMaker = {
  alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'x', 'z'],
  createKeyboard: function(alphabet) {
    $keyboard.html("");
    for (var i = 0; i < alphabet.length; i++) {
      var letter = alphabet[i];
      var key = $("<div></div>").addClass('key');
      key.html(letter);
      $keyboard.append(key);
      if (i % 9 === 8) {
        $keyboard.append("<br>");
      }
    }
    $keyboard.click(function(e) {
      var $target = $(e.target);
      var targetLetter = $target.text(); //e.target.innerHTML;
      game.guess(targetLetter);
    })
  }
};

// Main
keyboardMaker.createKeyboard(keyboardMaker.alphabet);
game.reset();