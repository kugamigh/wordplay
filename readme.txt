Josh Hurley | 218 054 706
Word Play

Strengthen your vocabulary by solving puzzles based around words.  You will need
to either unscramble the letters of an anagram or fill in the blank spaces to
complete a word.  Race against the clock to answer as many words as possible,
or go at your own pace in an endless mode.

Major features
2 game modes - Anagram and Fill the Blanks
	- Anagram mode will take a word from the dictionary and scramble it.  It is
    up to the player to guess what the original word is.  Each correct word
    gives 5 points and an incorrect word loses 1 point (timed games only).

  - Fill the blanks mode is similar to a hangman game.  A word is converted
    into a bunch of underscores, then the player will guess one letter at a
    time to try complete the word.  In timed games, the player earns 5 points
    for a completed word and loses 1 point for each incorrect guess.

Timed and untimed gameplay
  - By default, the game is timed and the player gets 60 seconds to guess as many
    words as possible in that time.

High scores
  - High scores are tracked for each variation of the game.  Points-based modes
    will list the top score for their respective mode and the endless modes show
    the highest word count.

Extensible dictionary
  - Anyone who wishes to add to the dictionary can do so by just adding in their
    words to data.js.  The structure is as follows:

    "category" : {
        "categoryName":
            "word": {
                "hint" : "hint text"
            }
    }

    Each word needs to belong to a specific category.  A category must have at
    least one word in it and every word must have a hint.

    There are no limits to how many categories you include, nor are there any
    limits to how many words can be within a category.
