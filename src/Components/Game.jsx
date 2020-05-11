import React, { useState, useEffect, useCallback } from "react";
import InputKeyButton from "./commons/Button";
import { OutputKeyButton } from "./commons/Button";
import LoadNextLevel from "./LoadNextLevel";
import GameOver from "./GameOver";
import Modal from "./Modal";
import HomePage from "./HomePage";
import { saveHighscore } from "../utils/highscore";


/**
 * Game component
 * @param  {props} currentScores - integer
 * @param {props} currentLevel - integer
 * @param {props} wordsNeeded - string
 * @return {objects} JSX - Game component elements
 * @return {component} HomePage - renders HomePage if isHomePage = true
 * @return {component} GameOver - renders GameOver if isGameOver = true
 * @return {component} LoadNextLevel - renders LoadNextLevel if isNextLevel = true
 */
const Game = ({ currentScores, currentLevel, wordsNeeded,anagramWord,anagramWordSolution }) => {




  const [anagram, setAnagram] = useState(anagramWord);
  const [outputKeys, setOutputKeys] = useState([]);
  const [previousAnagramState, setPreviousAnagramState] = useState(anagramWord);
  const [wordsFound, setWordsFound] = useState([]);
  const [score, setScore] = useState(currentScores);
  const [countDownTimer, setCountDownTimer] = useState(60);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isInvalid, setIsInValid] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isNextLevel, setIsNextLevel] = useState(false);
  const [isCongratModal, setIsCongratModal] = useState(false);
  const [isQuitModal, setIsQuitModal] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);

  /**
   * Quits game and take user back to hompage
   * @return {Function} Returns setIsHomePage function
   */
  const quitGame = () => {
    return setIsHomePage(true);
  };
  /**
   * Displays or hides QuitModal
   * @return {Function} Returns setIsQuitModal function
   */
  const toggleQuitModal = () => {
    setIsQuitModal(!isQuitModal);
  };

  /**
   * Clears the output letter buttons used to display the formed word then
   * restores the input letter buttons (used to create word)
   * @return {Function}  setAnagram -an updater function for anagram
   */
  const clearOutput = useCallback(() => {
    setOutputKeys([]);
    setAnagram(previousAnagramState);
  }, [previousAnagramState]);

  /**
   * Forms word from the selected input button
   * @return {Function}  setAnagram - an updater function for anagram
   */
  const handleInputButton = useCallback(
    (letter, id, index) => {
      // Display the selected letter on output button
      setOutputKeys([...outputKeys, { letter: letter, id: id, index: index }]);
      const anagramClone = [...anagram];
      /*  Removes the selected letter from input button by replacing the letter with a space. 
      PS input button with space are set to {display:none} in Button.jsx component*/
      anagramClone[index] = { char: " " };
      setAnagram(anagramClone);
    },
    [anagram, outputKeys]
  );
  /**
   * Once a user clicks on a letter on the output button, it removes the letter
   * and restore it back to its exact position in the input button.
   * @return {Function}  setAnagram - an updater function for anagram
   */
  const handleOutputButton = useCallback(
    (letter, id) => {
      setOutputKeys(
        outputKeys.filter((key) => {
          return key.id !== id;
        })
      );
      const anagramClone = [...anagram];
      const outputKeysClone = [...outputKeys];
      outputKeysClone.forEach((alphabet) => {
        if (alphabet.id === id) {
          anagramClone[alphabet.index] = { letter: letter, id: id };
        }
      });
      setAnagram(anagramClone);
    },
    [anagram, outputKeys]
  );

  /**
   * Shuffles the letters in anagram
   * Based on Fisher Yates Method.
   * Source => https://w3schools.com/js/js_array_sort.asp
   * @return {Function}  setPreviousAnagramState - an updater function for previousAnagramState
   */
  const shuffle = useCallback(() => {
    for (let i = previousAnagramState.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * i);
      let k = previousAnagramState[i];
      previousAnagramState[i] = previousAnagramState[j];
      previousAnagramState[j] = k;
    }

    //Resets output keyboard once it's done shuffling
    setOutputKeys([]);
    setAnagram(previousAnagramState);
    setPreviousAnagramState(previousAnagramState);
  }, [
    setPreviousAnagramState,
    setAnagram,
    setOutputKeys,
    previousAnagramState,
  ]);
  /**
   * Handles the hardware keyboard on laptop or computer, incase the user
   * want to type from keyboard instead of clicking on the screen buttons
   * @return {Function}  handleInputButton
   */
  const handleComputerKeyboard = useCallback(
    ({ key }) => {
      anagram.forEach((alphabet, index) => {
        if (alphabet.letter === key) {
          return handleInputButton(alphabet.letter, alphabet.id, index);
        }
      });
    },
    [anagram, handleInputButton]
  );
  /**
   *Uses the backspace key on the keyboard to remove the last button in the
   *output button
   * @return {Function}  handleOutputButton
   */
  const handleBackspaceKey = useCallback(
    ({ key }) => {
      if (key.toUpperCase() === "BACKSPACE" && outputKeys.length) {
        handleOutputButton(
          outputKeys[outputKeys.length - 1].letter,
          outputKeys[outputKeys.length - 1].id
        );
      }
    },
    [outputKeys, handleOutputButton]
  );

  /**
   *Uses the space key on the keyboard to call shuffle function
   * @return {Function}  handleOutputButton
   */

  const handleSpaceKey = useCallback(
    ({ key }) => {
      if (key === " ") {
        shuffle();
      }
    },
    [shuffle]
  );
  /**
   *Shuffles the anagram only once, before this component is rendered
   * @return {Function}  shuffle
   */
  useEffect(() => {
    return shuffle();
  }, [shuffle]);

  useEffect(() => {
    window.addEventListener("keyup", handleComputerKeyboard);
    window.addEventListener("keyup", handleBackspaceKey);
    window.addEventListener("keyup", handleSpaceKey);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keyup", handleComputerKeyboard);
      window.removeEventListener("keyup", handleBackspaceKey);
      window.removeEventListener("keyup", handleSpaceKey);
    };
  }, [handleComputerKeyboard, handleBackspaceKey, handleSpaceKey]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountDownTimer(countDownTimer - 1);
    }, 1000);
    if (!countDownTimer) {
      saveHighscore(score);
      // prevents the user from typing once the game is over
      window.removeEventListener("keyup", handleComputerKeyboard);
      window.removeEventListener("keyup", handleBackspaceKey);
      window.removeEventListener("keyup", handleSpaceKey);
      if (wordsFound.length >= wordsNeeded) {
        setIsCongratModal(true);
        clearInterval(intervalId);
      } else {
        setIsGameOver(true);
      }
    }

    return () => clearInterval(intervalId);
  }, [countDownTimer, wordsFound, wordsNeeded, score]);
  useEffect(() => {
    if (!outputKeys.length) {
      setIsInValid(false);
      return;
    }
    const formedWord = outputKeys
      .map((eachAlphabet) => eachAlphabet.letter)
      .join("");
    const wordIsValid = anagramWordSolution.includes(formedWord);
    const wordIsDuplicate = wordsFound.includes(formedWord);
    if (wordIsDuplicate) {
      setIsDuplicate(true);
      setIsInValid(false);
      return;
    } else {
      setIsDuplicate(false);
    }
    if (wordIsValid) {
      setIsInValid(false);
      setScore(score + formedWord.length * 100);
      setWordsFound([...wordsFound, formedWord]);
      clearOutput();
      setAnagram(previousAnagramState);
    }
    setIsInValid(true);
  }, [outputKeys, wordsFound, clearOutput, previousAnagramState, score]);
  // generate onscreen keyboard from the letters in anagram array
  const inputKeyboard = anagram.map((eachAlphabet, index) => {
    return (
      <InputKeyButton
        letter={eachAlphabet.letter}
        id={eachAlphabet.id}
        selectInputButton={handleInputButton}
        index={index}
        key={eachAlphabet.id}
      />
    );
  });
  // generates onscreen keyboard from the letters in outputKeys array
  const outputKeyboard = outputKeys.map((eachAlphabet, index) => {
    return (
      <OutputKeyButton
        letter={eachAlphabet.letter}
        id={eachAlphabet.id}
        selectOutputButton={handleOutputButton}
        index={index}
        key={eachAlphabet.id}
      />
    );
  });
  if (isNextLevel) {
    return <LoadNextLevel level={currentLevel + 1} scores={score} />;
  }
  if (isGameOver) {
    return (
      <GameOver
        level={currentLevel}
        score={score}
        wordsNeeded={wordsNeeded}
        wordsFound={wordsFound.length}
      />
    );
  }
  if (isHomePage) {
    return <HomePage />;
  }
  return (
    <>
      <section className="main-section">
        <section className="game-container">
          <section className="time-score-section">
            <h4>Time: {countDownTimer}</h4>
            <h4>Level: {currentLevel}</h4>
            <h4>Score: {score}</h4>
            <h4>
              <span className="quit-button" onClick={toggleQuitModal}>
                X
              </span>
            </h4>
          </section>
          <section className="output-button-section">
            {outputKeyboard.length ? (
              <div className="output-button">{outputKeyboard}</div>
            ) : (
              <div className="instructions">
                <h1>
                  Click on the letters below to form a valid English word.
                </h1>
              </div>
            )}
          </section>
          <section className="word_duplicate-section">
            <h1 className={isInvalid ? "is-invalid" : "valid"}>Invalid</h1>{" "}
            <h1 className={isDuplicate ? "is-duplicate" : "not-duplicate"}>
              Duplicate
            </h1>
          </section>
          <section className="info-section">
            <h1>
              Words Needed: <span>{wordsNeeded}</span>
            </h1>
            <h1>
              Words Found: <span>{wordsFound.length}</span>{" "}
            </h1>
          </section>

          <section className="input-button-section">{inputKeyboard}</section>
          <section className="secondary-button-container">
            <button className="secondary-button" onClick={shuffle}>
              Shuffle
            </button>
            <button onClick={clearOutput} className="secondary-button">
              Clear
            </button>
          </section>
        </section>
        <section className="word-found-container">
          <h1>Words Found</h1>
          {wordsFound.map((validWord) => {
            return <p>{validWord}</p>;
          })}
        </section>
        <Modal
          modalTitle={"Congratulations!"}
          displayModal={isCongratModal}
          modalBody={
            <>
              <p>Words Needed: {wordsNeeded}</p>
              <p>Words Found: {wordsFound.length}</p>
              <h1>You cleared this level.</h1>
            </>
          }
          modalFooter={
            <>
              <button
                onClick={() => setIsNextLevel(true)}
                className="secondary-button"
              >
                Proceed To the Next Level
              </button>
            </>
          }
        />
        <Modal
          modalTitle={"Quit Game?"}
          displayModal={isQuitModal}
          modalBody={
            <>
              <h1>This game will not be saved, continue?</h1>
            </>
          }
          modalFooter={
            <>
              <button onClick={quitGame} className="secondary-button">
                Yes
              </button>
              <button onClick={toggleQuitModal} className="secondary-button">
                No
              </button>
            </>
          }
        />
      </section>
    </>
  );
};
export default Game;
