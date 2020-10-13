// Declaring global variables for later use

// Tracking if a game is currently running, used later to control the game timer
window.isTimed = true;

// Track the current game mode, used later when selecting a game mode
window.gameMode = "";

// Tracking if the player has enabled/disabled sound effects
window.sfxEnabled = true;

// Loading the sound for the "correct answer" response to use later with correctSound.play()
// Source: https://freesound.org/people/Bertrof/sounds/131660/ - CC-BY
window.correctSound = new Audio("sounds/correct.wav");

// Loading the sound for the "incorrect answer" response to use later with incorrectSound.play()
// Source: https://freesound.org/people/Autistic%20Lucario/sounds/142608/ CC-BY
window.incorrectSound = new Audio("sounds/incorrect.wav");

/*
 * Configures all the UI elements based on the menu which has been passed in.
 *
 * params: menu - The HTML div object to display, contains other HTML objects
 *
 * Example usage: configureUI(displayMainMenu) would display the main menu
 *                configureUI(displayGameplayScreen) would display the game screen
 */
window.configureUI = function(menu) {
    console.log("configureUI started");

    // Clear html body before adding elements
    document.body.innerHTML = "";

    // Create div with all details passed in by caller in the menu parameter
    var mainContent = createDiv(menu);

    document.body.appendChild(mainContent);

    console.log("configureUI finished");
}

/*
    Create button that sends user back to the main menu

    returns: button element with onclick attribute set

    Example usage: var BackButton = returnToMainMenu();
*/
window.returnToMainMenu = function() {
  var element = createButton("Back");
  element.setAttribute("onclick", "configureUI(displayMainMenu())");
  element.classList.add("back");

  return element;
}

/*
    Display the main menu and all of its elements:
    Boxed header: Wordplay
    Buttons to navigate to mode select, instructions, leaderboard and options

    returns: menu elements
*/
function displayMainMenu() {
    console.log("displayMainMenu started");

    // Clear html body before adding elements
    document.body.innerHTML = "";

    // Array to use to hold all button elements to be displayed
    var buttons = [];

    // Div to contain all other div elements on page
    var container = createDiv();

    // Create div to hold header
    var headerBoxElement = createDiv();
    headerBoxElement.classList.add("header");

    // Add header text to the headerBoxElement div
    var headerTextElement = createDiv(createH1("Wordplay"));
    headerTextElement.classList.add("heading");
    headerBoxElement.appendChild(headerTextElement);

    // Create div to hold navigation buttons
    var menuBoxElement = createDiv();
    menuBoxElement.classList.add("menu");

    // Create button elements to go into the navigation menu
    buttons.push(createButton("Play"));
    buttons[0].setAttribute("onclick", "configureUI(displayModeSelectMenu())");
    buttons.push(createButton("Instructions"));
    buttons[1].setAttribute("onclick", "configureUI(displayInstructionsMenu())");
    buttons.push(createButton("Leaderboard"));
    buttons[2].setAttribute("onclick", "configureUI(displayLeaderboardMenu())");

    // Create a list used to align navigation buttons
    for ( button in buttons ) {
        menuBoxElement.appendChild(buttons[button]);
    }

    // Combine our divs into a single container div
    container.appendChild(headerBoxElement);
    container.appendChild(menuBoxElement);

    // Add identifier to container so that we know where it came from
    container.classList.add("mainmenu");

    console.log("displayMainMenu finished, passing in elements: ");
    console.log(container);
    return container;
};

/*
    Display menu for selecting different modes and all of its elements:
    Boxed header: Mode select
    Buttons to designate difficulty, go back, or start game

    returns: menu elements
*/
function displayModeSelectMenu() {
  console.log("displayModeSelectMenu started");

  // Clear html body before adding elements
  document.body.innerHTML = "";

  // Div to contain all other div elements on page
  var container = createDiv();

  // Create div to hold header
  var headerBoxElement = createDiv();
  headerBoxElement.classList.add("header");

  // Add header text to the headerBoxElement div
  var headerTextElement = createDiv(createH1("Mode Select"));
  headerTextElement.classList.add("heading");
  headerBoxElement.appendChild(headerTextElement);

  // Create div to hold body info
  var bodyBoxElement = createDiv();
  bodyBoxElement.classList.add("body");

  // TODO: Move the individual modes to a data file, then reference them

  // Create div to hold "Anagram" mode details and selection
  var anagramBoxElement = createDiv();
  anagramBoxElement.classList.add("anagram");

  // Create "Anagram" button to toggle anagram mode gameplay
  var anagramButton = createButton("Anagram");
  anagramButton.onclick = function() {
      window.gameMode = "anagram";
      configureUI(displayGameplayScreen(window.gameMode));
  };
  anagramBoxElement.appendChild(anagramButton);

  // Create description for "Anagram" mode and append directly to anagram div
  anagramBoxElement.appendChild(createParagraph("Unscramble the words"));
  anagramBoxElement.appendChild(createParagraph(
    "The letters in these words have been mixed up, put them back in the normal order!"));

  // Append anagram div to body div element
  bodyBoxElement.appendChild(anagramBoxElement);

  // Create div to hold "Fill the Blanks" mode details and selection
  var filltheblanksBoxElement = createDiv();
  filltheblanksBoxElement.classList.add("filltheblanks");

  // Create "Fill the Blanks" button to toggle filltheblanks mode gameplay
  var filltheblanksButton = createButton("Fill the Blanks");
  filltheblanksBoxElement.appendChild(filltheblanksButton);
  filltheblanksButton.onclick = function() {
      window.gameMode = "filltheblanks";
      configureUI(displayGameplayScreen(window.gameMode));
  };

  // Create description for "Endless" mode and append directly to filltheblanks div
  filltheblanksBoxElement.appendChild(createParagraph("Guess the letters"));
  filltheblanksBoxElement.appendChild(createParagraph(
    "Each letter in the word has been blanked out, guess the word one letter at a time!"));

  // Append filltheblanks div to body div element
  bodyBoxElement.appendChild(filltheblanksBoxElement);

  // Timed or endless checkbox div
  timedBoxElement = createDiv();
  timedBoxElement.classList.add("timed");

  // Label and checkbox
  var timedLabel = createLabel("Timed: ");
  var timedCheckbox = createTextInput();
  timedCheckbox.setAttribute("type", "checkbox");

  // Ticked by default, but remembers if it has been disabled between games
  timedCheckbox.checked = window.isTimed;

  // Event listener for when the checkbox is clicked (changed)
  timedCheckbox.onclick = function() {
      console.log("Updating timed status");
      if ( window.isTimed === true) {
          window.isTimed = false;
      }
      else {
          window.isTimed = true;
      }
  };

  timedBoxElement.appendChild(timedLabel);
  timedBoxElement.appendChild(timedCheckbox);

  // Append timed div to body div element
  bodyBoxElement.appendChild(timedBoxElement);

  // Create div to hold back button
  var footerBoxElement = createDiv();
  footerBoxElement.classList.add("footer");

  // Create button to return to main menu
  var backButton = returnToMainMenu();
  footerBoxElement.appendChild(backButton);

  // Combine our divs into a single container div
  container.appendChild(headerBoxElement);
  container.appendChild(bodyBoxElement);
  container.appendChild(footerBoxElement);

  // Add identifier to container so that we know where it came from
  container.classList.add("modeselect");

  console.log("displayModeSelectMenu finished, passing in elements: ");
  console.log(container);
  return container;
}

/*
    Display the instructions menu and all of its elements:
    Boxed header: Instructions
    Boxed instructions: Text telling player how the game works
    Button to return to main menu

    returns: menu elements
*/
function displayInstructionsMenu() {
    console.log("displayInstructionsMenu started");

    // Clear html body before adding elements
    document.body.innerHTML = "";

    // Div to contain all other div elements on page
    var container = createDiv();

    // Create div to hold header
    var headerBoxElement = createDiv();
    headerBoxElement.classList.add("header");

    // Add header text to the headerBoxElement div
    var headerTextElement = createDiv(createH1("Instructions"));
    headerTextElement.classList.add("heading");
    headerBoxElement.appendChild(headerTextElement);

    // Create div to hold body info
    var bodyBoxElement = createDiv();
    bodyBoxElement.classList.add("instructions-body");

    /*
        Create paragraphs with instructions on how to play
        Screenshots provided with each step of instruction
    */

    // Div for anagram text + image
    var anagramContainer = createDiv();
    anagramContainer.appendChild(createParagraph(
      "Guess the word which has been jumbled up"
    ));
    anagramContainer.appendChild(createImage("images/anagram.png"));

    // Div for mising letter text + image
    var missingLetterContainer = createDiv();
    missingLetterContainer.appendChild(createParagraph(
      "Fill in the missing letters"
    ));
    missingLetterContainer.appendChild(createImage("images/filltheblanks.png"));

    // Div for category name text + image
    var categoryContainer = createDiv();
    categoryContainer.appendChild(createParagraph(
      "Read the category name for help"
    ));
    categoryContainer.appendChild(createImage("images/category.png"));

    // Div for hint text + image
    var hintContainer = createDiv();
    hintContainer.appendChild(createParagraph(
      "Or click the hint button to reveal a letter, but use them sparingly"
    ));
    hintContainer.appendChild(createImage("images/hint.png"));

    // Combine all div containers into body box
    bodyBoxElement.appendChild(anagramContainer);
    bodyBoxElement.appendChild(missingLetterContainer);
    bodyBoxElement.appendChild(categoryContainer);
    bodyBoxElement.appendChild(hintContainer);

    // Create div to hold back button
    var footerBoxElement = createDiv();
    footerBoxElement.classList.add("footer");

    // Create button to return to main menu
    var backButton = returnToMainMenu();
    footerBoxElement.appendChild(backButton);

    // Combine our divs into a single container div
    container.appendChild(headerBoxElement);
    container.appendChild(bodyBoxElement);
    container.appendChild(footerBoxElement);

    // Add identifier to container so that we know where it came from
    container.classList.add("instructions");

    console.log("displayInstructionsMenu finished, passing in elements: ");
    console.log(container);
    return container;
};

/*
    Display the leaderboard menu and all of its elements:
    Boxed header: leaderboard
    Boxed leaderboard: Table containing list of players and their high scores
    Button to return to main menu

    returns: menu elements
*/
function displayLeaderboardMenu() {
    console.log("displayLeaderboardMenu started");

    // Clear html body before adding elements
    document.body.innerHTML = "";

    // Div to contain all other div elements on page
    var container = createDiv();

    // Create div to hold header
    var headerBoxElement = createDiv();
    headerBoxElement.classList.add("header");

    // Add header text to the headerBoxElement div
    var headerTextElement = createDiv(createH1("Leaderboard"));
    headerTextElement.classList.add("heading");
    headerBoxElement.appendChild(headerTextElement);

    // Create div to hold body info
    var bodyBoxElement = createDiv();
    bodyBoxElement.classList.add("body");

    // Create div to hold timed scores info
    var timedScoresElement = createDiv();
    timedScoresElement.classList.add("timed-scores");

    // Header for the timed scores
    timedScoresElement.appendChild(createH2("Timed"));

    // Paragraphs for each score
    timedScoresElement.appendChild(createParagraph("Anagram: " + window.highScores.anagram.points + " points"));
    timedScoresElement.appendChild(createParagraph("Fill the blanks: " + window.highScores.filltheblanks.points + " points"));

    // Create div to hold endless scores info
    var endlessScoresElement = createDiv();
    endlessScoresElement.classList.add("endless-scores");

    // Header for the timed scores
    endlessScoresElement.appendChild(createH2("Endless"));

    // Paragraphs for each score
    endlessScoresElement.appendChild(createParagraph("Anagram: " + window.highScores.anagram.words + " words"));
    endlessScoresElement.appendChild(createParagraph("Fill the blanks: " + window.highScores.filltheblanks.words + " words"));

    // Add these divs to the main body div
    bodyBoxElement.appendChild(timedScoresElement);
    bodyBoxElement.appendChild(endlessScoresElement);

    // Create div to hold back button
    var footerBoxElement = createDiv();
    footerBoxElement.classList.add("footer");

    // Create button to return to main menu
    var backButton = returnToMainMenu();
    footerBoxElement.appendChild(backButton);

    // Combine our divs into a single container div
    container.appendChild(headerBoxElement);
    container.appendChild(bodyBoxElement);
    container.appendChild(footerBoxElement);

    // Add identifier to container so that we know where it came from
    container.classList.add("leaderboard");

    console.log("displayLeaderboardMenu finished, passing in elements: ");
    console.log(container);
    return container;
}

/*
    Select a random word from our dictionary, based on the game mode
    selected, either format it as an anagram or a partial word

    params: puzzleType - The method to use for changing the word

    returns: partial or anagrammed word string in lower case
*/
function selectWord( puzzleType ) {
    var categories = Object.keys(dictionary.category);
    var categoryIndex = Math.floor(Math.random() * categories.length);
    var categoryWords = dictionary.category[categories[categoryIndex]];
    var wordList = Object.keys(categoryWords);

    /*
     *  The currently chosen category.  Will be used later to indicate to the
     *  player what kind of word they need to guess
     */
    window.currentCategory = Object.keys(dictionary.category)[categoryIndex];

    // Store the index so that we can reference it later
    var wordIndex = Math.floor(Math.random() * wordList.length);

    /*
     *  The currently chosen word.  Will be used later to create an actual puzzle
     *  for the player to solve.
     */
    window.currentWord = wordList[wordIndex];

    if ( window.previousWords.includes(window.currentWord) ) {
        if ( window.previousWords.length < wordList.length)
        selectWord(puzzleType);
    }

    window.previousWords.push(window.currentWord);

    /*
     *  Hint text for the currently chosen word.  Will be used later when the player
     *  requests a hint within the game
     */
    window.currentWordHint = dictionary.category[window.currentCategory][window.currentWord].hint;

    /*
     *  Store each letter of that word in an array so that we can later check
     *  if our guess is correct.  All in lowercase.
     */
    window.correctLetters = window.currentWord.toLowerCase().split('');

    console.log("The word is: " + window.currentWord);

    var selectedWord = "";

    if ( puzzleType == "anagram" ) {
      /*  Shuffle the current word

          params: word - The word we want to scramble

          returns: shuffledWord - A scrambled string from the word

          Example use:  shuffleWord("puzzle") - Could return zuplez
                        shuffleWord("classic") - Could return lacsisc
      Source: https://stackoverflow.com/a/34025991
      */
      function shuffleWord( word ) {
          console.log("Shuffling word");
          var shuffledWord = '';

          wordToShuffle = word.split('');

          while (wordToShuffle.length > 0) {
              /*  Splice out one character and then bitwise shift the rest
                  of the characters to the left
              */
              shuffledWord +=  wordToShuffle.splice(wordToShuffle.length * Math.random() << 0, 1);
          }

          return shuffledWord;
      }
      selectedWord = shuffleWord(window.currentWord);

      // Make sure we shuffled the word
      while ( selectedWord == window.currentWord ) {
          selectedWord = shuffleWord(window.currentWord);
      }

    }
    else if ( puzzleType = "filltheblanks" ) {
      /*  Replace the word with a number of underscores equal to
          the length of  the word.
      */
      function fillTheBlanks( word ) {
          console.log("Blanking word");
          /*
           *  Global variable blankedWord so we can use it to replace single
           *  letters as they are guessed
           */
          window.blankedWord = [];

          for ( var letters = 0; letters < word.length; letters++ ) {
              blankedWord.push("_");
          }

          return blankedWord;
      }

      selectedWord = fillTheBlanks(window.currentWord).join(' ');
    }

    // Return the selected word all in lowercase
    return selectedWord.toUpperCase();
}

/*
    Displays the Gameplay menu and all of its elements in selected mode
    Can be anagram or filltheblanks mode
    Boxed header: Current word
    Progress bar: Current time remaining (if timed)
    Boxed guesses: Letters that have already been guessed (fill the blanks mode)
    Hint button: Reveals a hint to the player if they have any left to use

    params: selectedMode - The type of game screen to load,anagram or filltheblanks
    returns: menu elements

    Example usage:  displayGameplayScreen("anagram")
                    Would generate HTML objects for anagram mode

                    displayGameplayScreen("fillTheBlanks")
                    Would generate HTML objects for filltheblanks mode
*/
function displayGameplayScreen( selectedMode ) {
    console.log("displayGameplayScreen started with " + selectedMode + " as parameter");
    // Score to display to the player, to be updated later with addScore()
    window.currentScore = 0;

    // Persistent list of all correct guesses so far, to be used in validation
    window.correctGuesses = [];

    // Persistent list of all incorrect guesses so far, to be used in validation
    window.incorrectGuesses = [];

    // Persistent count of how many words have been correctly answered so far
    window.wordsAnswered = 0;

    window.currentWord = "";

    // An array of previously selected words.  Used to avoid duplicates.
    window.previousWords = [];

    // The word that is currently hidden from the player, set with selectWord()
    window.puzzleWord = "";
    window.currentCategory = "";

    // Remaining hints for the player to use.  Updated with getHint()
    window.remainingHints = 3;

    // Clear html body before adding elements
    document.body.innerHTML = "";

    /* Used to determine if the player has requested a hint or not
     *  Updated with newWord() and hintButton.onclick
     */
    window.hintRequested = false;

    // Select the type of puzzle
    window.puzzleWord = selectWord(window.gameMode);

    // Div to contain all other div elements on page
    var container = createDiv();

    // Mute buttons
    if ( window.sfxEnabled == true ) {
      // Source: https://www.flaticon.com/free-icon/speaker_149135#term=sound&page=1&position=28 CC-BY
        var muteImage = createImage("images/mute.png");
    }
    else {
      // Source: https://www.flaticon.com/free-icon/speaker_149135#term=sound&page=1&position=27 CC-BY
      var muteImage = createImage("images/speaker.png");
    }
    muteImage.classList.add("mute");
    muteImage.onclick = function () {
        if ( window.sfxEnabled == false ) {
            this.src = "images/mute.png";
            window.sfxEnabled = true;
        }
        else {
            this.src = "images/speaker.png";
            window.sfxEnabled = false;
        }
    };

    container.appendChild(muteImage);

    // Create div to hold header
    var headerBoxElement = createDiv();
    headerBoxElement.classList.add("header");

    // Header text contained in its own div
    window.headerText = createH1(window.puzzleWord.toUpperCase());
    var headerTextElement = createDiv(window.headerText);
    headerTextElement.classList.add("currentword");

    // Add header text to the headerBoxElement div
    headerBoxElement.appendChild(headerTextElement);

    // Add category within header box
    /*
     *  Category text is global so that it can be updated later by other functions,
     *  like newWord()
     */
    window.categoryText = createH2("Category: " + window.currentCategory);
    var categoryTextElement = createDiv(window.categoryText);
    categoryTextElement.classList.add("category");
    headerBoxElement.appendChild(categoryTextElement);

    // Add score within the header box
    /*
     *  Score text is global so that it can be updated later by other functions,
     * like addScore() or subtractScore()
     */
     // If it's timed, show points score
     if ( window.isTimed ) {
        window.scoreText = createH2("Score: " + window.currentScore);
    }
    // If it's endless, show words answered
    if ( !window.isTimed ) {
        window.scoreText = createH2("Words: " + window.wordsAnswered);
    }

    var scoreTextElement = createDiv(window.scoreText);
    scoreTextElement.classList.add("score");
    headerBoxElement.appendChild(scoreTextElement);

    // Set up the time remaining bar if this is "Timed" mode
    if ( window.isTimed == true ) {
        // Create div to hold the time remaining bar
        var progressBoxElement = createDiv();
        progressBoxElement.classList.add("progress");

        // TODO: Move this to its own function
        // Source: https://www.w3schools.com/howto/howto_js_progressbar.asp
        // Make a div element with some text in it, then assign an ID to the div
        let progressBar = createDiv();
        progressBar.innerHTML = "";

        progressBar.setAttribute("id", "timeLeft");
        progressBar.style.textAlign = "left";

        // Flag to determine whether or not the timer is running
        let timerStarted = false;

        // Shrink the width of the "progressBar" div element over time
        function moveBar(duration) {
            var seconds = duration;
            var width = 100;
            var interval = width / seconds;

            // moveBarTimer is global so that it may be stopped from outside this function
            window.moveBarTimer = setInterval(frame, 1000);
            /*
             *  The actions we want to take each frame
             */
            function frame() {
                // Determine whether or not have reached a 0 width bar
                // The last second transitions to the end game screen
                if ( seconds <= 0 ) {
                    clearInterval(moveBarTimer);
                    timerStarted = false;
                    progressBar.style.width = "0%";
                    progressBar.innerHTML = "Finished!";
                    endGame();
                }
                // Otherwise shrink the bar by 1 second's worth
                else {
                    width -= interval;
                    seconds--;
                    progressBar.style.width = width + '%';
                    progressBar.innerHTML = (seconds + 1) * 1 + "s";
                }
            }
        }

        // Begin the resizing and countdown for "progressBar" div
        function startTimerBar() {
            if ( timerStarted === false ) {
                moveBar(60);
                timerStarted = true;
            }
        }

        // Start the timer as soon as the element loads
        progressBar.onload = startTimerBar();

        // Put the progress bar into its parent container
        progressBoxElement.appendChild(progressBar);
    }

    // Create div to hold body info
    var guessesBoxElement = createDiv();
    guessesBoxElement.classList.add("guesses");


    // Only load guess info if this is filltheblanks mode
    if ( window.gameMode == "filltheblanks") {
        // All the correct guesses
        var correctGuessesElement = createDiv();
        correctGuessesElement.classList.add("correct");
        window.correctParagraph = createParagraph("Correct: ");
        correctGuessesElement.appendChild(window.correctParagraph);

        // All the incorrect guesses
        var incorrectGuessesElement = createDiv();
        incorrectGuessesElement.classList.add("incorrect");
        window.incorrectParagraph = createParagraph("Incorrect: ");
        incorrectGuessesElement.appendChild(window.incorrectParagraph);

        // Append correct/incorrect divs to main guesses element
        guessesBoxElement.appendChild(correctGuessesElement);
        guessesBoxElement.appendChild(incorrectGuessesElement);
    }
    // Text field to enter answers within
    var answerLabel = createLabel("Answer: ");

    /*
     *  answerTextField is global so that other functions can force focus to it
     */
    window.answerTextField = createTextInput();
    answerTextField.setAttribute("id", "answer");

    // Enforce a maximum length of 1 character if we are in filltheblanks mode
    if ( window.gameMode == "filltheblanks") {
      answerTextField.setAttribute("maxlength", "1");
    }

    // Answer input field
    var answerDiv = createDiv(answerTextField);
    answerDiv.classList.add("answer-field");

    answerDiv.appendChild(answerLabel);
    answerDiv.appendChild(answerTextField);

    // Hint button and text
    /*
     *  hintText is global so that it can be hidden/shown by other functions
     *  like hintbutton.onClick or newWord()
     */
    window.hintText = createParagraph(window.currentWordHint);

    /*
     *  hintButton is global so that it can be updated by its onclick function
     *  and decrease the remaining hint counter.  Also allows us to disable it at endGame()
     */
    window.hintButton = createButton("Hint - " + window.remainingHints + " left");

    // When the hint button is clicked, unhide the hint text if any hints remain
    hintButton.onclick = function() {
        console.log("Hint requested");

        // Check to see if the hint is hidden
        if ( !window.hintRequested ) {
            // if it is, check if we have hints left
            if ( window.remainingHints > 0 ) {
                // Update remaining hints and then display the change to the player
                window.remainingHints -= 1;
                window.hintTextElement.style.display = "inherit";
                window.hintButton.innerHTML = "Hint - " + window.remainingHints + " left";
                window.hintRequested = true;
            }
            // If we have none, tell the player
            if ( window.remainingHints == 0 ) {
                window.hintButton.innerHTML = "No hints left";
            }
        }
        // Bring focus back to the answer field
        window.answerTextField.focus();
    }

    // Divs for hint button and text
    var hintButtonElement = createDiv(hintButton);
    hintButtonElement.classList.add("hint-button");

    /*
     *  hintTextElement is global so that it can be hidden/shown by other functions
     *  like hintbutton.onClick or newWord()
     */
    window.hintTextElement = createDiv();
    hintTextElement.appendChild(hintText);
    hintTextElement.classList.add("hint-text");

    // Combine our divs into a single container div
    container.appendChild(headerBoxElement);
    if ( window.isTimed == true ) {
        container.appendChild(progressBoxElement);
    }

    // Adding an event listener and a flag to indicate whether or not it is added
    answerTextField.onchange = keyTypedEvent;

    // Combine elements into the main guesses/body div
    guessesBoxElement.appendChild(answerDiv);
    guessesBoxElement.appendChild(hintTextElement);
    guessesBoxElement.appendChild(hintButtonElement);

    // Add guesses box element to the main container
    container.appendChild(guessesBoxElement);

    // Create div to hold back button
    var footerBoxElement = createDiv();
    footerBoxElement.classList.add("footer");

    // Create button to return to main menu
    var backButton = createButton("Quit");
    backButton.onclick = endGame;
    footerBoxElement.appendChild(backButton);

    // Add footer box element to main container
    container.append(footerBoxElement);

    // Add a class to the game screen so that we know where it came from
    container.classList.add("game-screen");

    return container;
}

/*
 *  Generates a new word for the player to guess.  Clears out the current guesses
 *  and hides the hint (if visible)
 *
 *  Example usage: newWord()
 */
function newWord() {
    console.log("Selecting a new word");

    // Reset hint request
    window.hintRequested = false;

    // Only clear the guesses info if it exists
    if (window.gameMode == "filltheblanks") {
        // Clear guesses arrays
        window.correctGuesses = [];
        window.incorrectGuesses = [];

        // Clear guess paragraphs
        window.correctParagraph.innerHTML = "Correct: ";
        window.incorrectParagraph.innerHTML = "Incorrect: ";
    }
    // Select a new word
    window.puzzleWord = selectWord(window.gameMode);

    // Update the word and category
    window.headerText.innerHTML = window.puzzleWord;
    window.categoryText.innerHTML = "Category: " + window.currentCategory;

    // Update the hint
    window.hintText.innerHTML = window.currentWordHint;

    // Hide the hind
    window.hintTextElement.style.display = "none";

    // Clear the answer field
    window.answerTextField.value = "";

    // Focus the answer field again
    window.answerTextField.focus();

}

/*
 *  Adds 5 points to the score if the player guesses correctly in timed mode
 *  Adds 1 to the words guessed count if in endless mode
 *  Updates the score text element
 *
 *  Example usage: addScore()
 */
function addScore() {
    console.log("Adding points");

    // If we're playing timed, add 5 to score
    if ( window.isTimed ) {
        window.currentScore += 5;

        window.scoreText.innerHTML = "Score: " + window.currentScore;
    }

    // If we're playing endless, add 1 to word count
    if ( !window.isTimed ) {
        wordsAnswered++;

        window.scoreText.innerHTML = "Words: " + window.wordsAnswered;
    }

    // Clear the answer field
    window.answerTextField.value = "";

    // Focus the answer field again
    window.answerTextField.focus();
}

/*
 *  Removes 1 point from the score if the player guesses incorrectly
 *  Updates the score text element
 *
 *  Example usage: subtractScore()
 */
function subtractScore() {
    if ( window.currentScore > 0 ) {
        console.log("Removing point");
        window.currentScore -= 1;
    }
    else {
        console.log("Not enough points to lose");
    }

    // Update the score or words answered text based on whether it is timed or not
    if ( window.isTimed ) {
        window.scoreText.innerHTML = "Score: " + window.currentScore;
    }

    // If we're playing endless, add 1 to word count
    if ( !window.isTimed ) {
        window.scoreText.innerHTML = "Words: " + window.wordsAnswered;
    }

    // Clear the answer field
    window.answerTextField.value = "";

    // Focus the answer field again
    window.answerTextField.focus();
}

/*
 *  Fill blank spaces with correct guesses in the hangman/fill the blanks puzzles
 *
 *  params:   character - Letter to fill in
 *
 *  Example usage: fillBlanks("a") would fill in any "a" characters in th current word
                   fillBlanks("g") would fill in any "g" characters in th current word
 */
function fillBlanks( character ) {
    console.log("Filling blanks");
    var newLetters = [];

    // Check all the letters in our correctLetters array
    for ( letter in window.correctLetters ) {
        // See if it matches the character we passed in
        if ( window.correctLetters[letter] == character ) {
            window.blankedWord[letter] = character;
        }
    }
    window.headerText.innerHTML = blankedWord.join(' ');
}

/*
 *  Check to see if what has been entered in the answer text field is part of
 *  the actual answer, or contains the whole answer.
 *
 *  param:  guess - The string that has been passed through the answer text field
 *
 *  return: true or false
 *
 *  Example usage - checkAnswer(event.key, window.gameMode);
 */
function checkAnswer(guess) {
    console.log("Checking guess: " + guess);

    // Clear the answer field
    window.answerTextField.value = "";

    // Re-focus the answer field
    window.answerTextField.focus();

    if ( window.gameMode == "anagram") {
        if ( guess.toLowerCase() == window.currentWord.toLowerCase() ) {
            console.log("Correct");
            return true;
        }
        else {
            console.log("Incorrect");
            return false;
        }
    }
    else {
        if ( window.correctLetters.includes(guess) ) {
            console.log("Correct");
            return true;
        }
        else {
            console.log("Incorrect");
            return false;
        }
    }

}

/*
 *  Event listener for when the user types on the keyboard.  Checks to see if it
 *  is a character of the English alphabet.
 *
 *  params: event - The key press event which is being listened to
 *
 *  Example usage:  answerTextField.onchange = keyTypedEvent;
 */
function keyTypedEvent(event) {
    // Make sure the input is part of the alphabet
    var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
                    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    // Get the value of our answer box if it isn't empty
    if ( event.target.value != "" ) {
        var guess = event.target.value.toLowerCase();
    }

    if ( window.gameMode == "anagram" ) {
        // Check if the answer is correct
        if ( checkAnswer(guess) == true ) {
            // If it is, add score, generate a new word and increment wordsAnswered
            addScore();
            newWord();
            // If sound is enabled, play the correct sound
            if (window.sfxEnabled === true) {
                window.correctSound.play();
                // Restart the sound in case it is already playing
                window.correctSound.currentTime = 0;
            }
        }
        else {
            // If it isn't, lower their score
            subtractScore();
            if (window.sfxEnabled === true) {
                // If sound is enabled, play the incorrect sound
                window.incorrectSound.play();
                // Restart the sound in case it is already playing
                window.incorrectSound.currentTime = 0;
            }
        }
    }
    else if ( window.gameMode == "filltheblanks" ) {
        // Make sure we entered a valid character
        if ( alphabet.includes(guess) ) {
            if ( checkAnswer(guess) == true ) {
                // If it is, add it to the correct guesses (if not duplicate)
                if ( !correctGuesses.includes(guess) ) {
                    correctGuesses.push(guess);
                    // If sound is enabled, play the correct sound
                    if (window.sfxEnabled === true) {
                      window.correctSound.play();
                      // Restart the sound in case it is already playing
                      window.correctSound.currentTime = 0;
                    }
                }
                // Clear the correct paragraph before updating it
                window.correctParagraph.innerHTML = "Correct: ";
                    for (correctAttempt in window.correctGuesses ) {
                        window.correctParagraph.innerHTML += window.correctGuesses[correctAttempt] + " ";
                    }
                    // Replace blanks with actual letters
                    fillBlanks(guess);

                    // Check if we've filled all the blank spaces
                    if ( !blankedWord.includes("_") ) {
                        // If it is, add score, generate a new word and increment wordsAnswered
                        addScore();
                        newWord();
                        // If sound is enabled, play the correct sound
                        if (window.sfxEnabled === true) {
                          window.correctSound.play();
                          // Restart the sound in case it is already playing
                          window.correctSound.currentTime = 0;
                        }
                    }
            }
            else {
                // If it isn't, add it to incorrect guesses (if not duplicate)
                if ( !incorrectGuesses.includes(guess) ) {
                    incorrectGuesses.push(guess);
                    // If sound is enabled, play the incorrect sound
                    if (window.sfxEnabled === true) {
                      window.incorrectSound.play();
                      // Restart the sound in case it is already playing
                      window.incorrectSound.currentTime = 0;
                    }
                }
                // Clear the incorrect paragraph before updating it
                window.incorrectParagraph.innerHTML = "Incorrect: ";
                    for (incorrectAttempt in window.incorrectGuesses ) {
                        window.incorrectParagraph.innerHTML += window.incorrectGuesses[incorrectAttempt] + " ";
                    }
                    subtractScore();
            }
        }
        else {
            // If sound is enabled, play the incorrect sound
            if (window.sfxEnabled === true) {
                window.incorrectSound.play();
                // Restart the sound in case it is already playing
                window.incorrectSound.currentTime = 0;
                window.answerTextField.value = "";
            }
        }
    }

}

/*
 *  Checks to see if the current game score is a new high score for that game
 *  mode.
 *
 * returns: true or false
 */
function checkPointsRecord() {
    console.log("Checking point scores");

    // Check new points records
    if ( window.currentScore > window.highScores[window.gameMode]['points'] ) {
        console.log("New high point score for " + window.gameMode);
        updateRecord("points");
        return true;
    }
    else {
        return false;
    }
}

/*
 *  Checks to see if the current game score is a new high score for that game
 *  mode.
 *
 *  returns: true or false
 *
 *  Example usage: checkPointsRecord()
 */
function checkWordsRecord() {
    console.log("Checking word scores");
    // Check for new words answered records
    if ( window.wordsAnswered > window.highScores[window.gameMode]['words'] ) {
        console.log("New high word score for " + window.gameMode);
        updateRecord("words");
        return true;
    }
    else {
        return false;
    }
}

/*
 *  Update the high scores list based on score or word count depending on
 *  the game mode being played
 *
 *  params:   score - Score to be updated
 */
function updateRecord(score) {
    console.log("Updating high score");
    if ( score == "points" ) {
        window.highScores[window.gameMode][score] = window.currentScore;
    }

    if ( score == "words" ) {
        window.highScores[window.gameMode][score] = window.wordsAnswered;
    }
}

/*
  Pops up a window which prompts the user to enter their name.  This
  name and their score will be recorded in the high score list if it
  qualifies.

  Example usage:  endGame();
*/
function endGame() {
    console.log("Ending game");

    // Disable making new guesses and requesting hints
    window.answerTextField.disabled = true;
    window.hintButton.disabled = true;

    // Stop the game timer
    clearInterval(window.moveBarTimer);

    // Reset hint request
    window.hintRequested = false;

    var buttons = [];

    // Check that we haven't already created this element
    if ( !window.gameFinishedContainer ) {
        console.log("Creating end screen");
        // Create a div to hold our end game pop-up
        window.gameFinishedContainer = createDiv();
        gameFinishedContainer.classList.add("popup-box");

        // Make the div appear on screen
        gameFinishedContainer.style.display = "block";

        // Create a div for the content in our pop-up
        gameFinishedDetails = createDiv();
        gameFinishedDetails.classList.add("popup-content");

        buttons[0] = createButton("Play again");
        buttons[0].classList.add("replay");

        buttons[0].onclick = function() {
            configureUI(displayGameplayScreen(window.gameMode));
        }

        buttons[1] = createButton("Main menu");
        buttons[1].classList.add("main");

        buttons[1].onclick = function() {
            configureUI(displayMainMenu());
        }

        gameFinishedDetails.appendChild(createParagraph("Game finished"));

        // Check if we're playing timed or not
        if ( window.isTimed ) {
            if ( checkPointsRecord() === true ) {
                // Let the player know if they got a high score
                gameFinishedDetails.appendChild(createParagraph("New points record!"));
            }
        }
        else {
            if ( checkWordsRecord() === true ) {
                // Let the player know if they got a high score
                gameFinishedDetails.appendChild(createParagraph("New words record!"));
            }
        }

        for ( button in buttons ) {
            gameFinishedDetails.appendChild(buttons[button]);
        }

        gameFinishedContainer.appendChild(gameFinishedDetails);

        document.body.appendChild(gameFinishedContainer);

        // Reset the container to be empty so we can avoid duplicating the elements
        window.gameFinishedContainer = "";
    }
    // If we have created it already, just update the style instead
    else
    {
        console.log("Showing end screen");
        // Make the div appear on screen
        gameFinishedContainer.style.display = "block";
    }
}


// Actions to take when first opening our application
function loadApplication() {
    console.log("Application loaded");
    // Load directly to the main menu
    configureUI(displayMainMenu());

};

window.onload = loadApplication;
