import React, { useState, useEffect, useCallback } from "react";
import Button from "./commons/Button";
import { ButtonTwo } from "./commons/Button";
import GameNav from "../Components/GameNav";
import anagrams from "../anagrams";
import LoadNextLevel from './LoadNextLevel'
import GameOver from './GameOver';
import Modal from './Modal'
console.log(anagrams)
const anagramWord = anagrams.word
const anagramWordSolution = anagrams.solutions;
const wordsWithId = anagramWord.split("").map((letter, index) => {
  return { char: letter, id: `00${index}` };
});
const words = wordsWithId


console.log(wordsWithId);
const Game = ({currentScores,currentLevel,wordsNeeded}) => {
  const [anagram, setAnagram] = useState(words);
  const [output, setOutput] = useState([]);
  const [previousState, setPreviousState] = useState(words);
  const [wordsFound, setWordsFound] = useState([]);
  const [score, setScore] = useState(currentScores);
  const [countDownTimer, setCountDownTimer] = useState(60);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isInvalid, setIsInValid] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [nextLevel, setNextLevel] = useState(false);
  const [isCongratModal, setIsCongratModal] = useState(false);
  const [isQuitModal, setIsQuitModal] = useState(true);

  const clearOutput = useCallback(() => {
    setOutput([]);
    setAnagram(previousState);
  }, [previousState]);
  const onClick = useCallback(
    (char, id, index) => {
      setOutput([...output, { char: char, id: id, index: index }]);
      const modifiedAnagram = [...anagram];
      modifiedAnagram[index] = { char: " " };
      setAnagram(modifiedAnagram);
    },
    [anagram, output]
  );
  const onClickTwo = useCallback(
    (char, id) => {
      setOutput(
        output.filter((eachOut) => {
          return eachOut.id !== id;
        })
      );
      const out1 = [...anagram];
      const newAnag = [...output];
      newAnag.forEach((el) => {
        if (el.id === id) {
          out1[el.index] = { char: char, id: id };
        }
      });
      setAnagram(out1);
    },
    [anagram, output]
  );
  // Based on Fisher Yates Method.
  // Source => https://w3schools.com/js/js_array_sort.asp
  const shuffle = useCallback(() => {
    for (let i = previousState.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * i);
      let k = previousState[i];
      previousState[i] = previousState[j];
      previousState[j] = k;
    }
    setOutput([]);
    setAnagram(previousState);
    setPreviousState(previousState);
  }, [setPreviousState, setAnagram, setOutput, previousState]);
  const upHandler = useCallback(
    ({ key }) => {
      console.log(key);
      console.log(anagram);
      anagram.some((char, index) => {
        if (char.char.toUpperCase() === key.toUpperCase()) {
          console.log(char, char.id, index);
          onClick(char.char, char.id, index);
        }
      });
    },
    [anagram, onClick]
  );
  const handleBackspaceKey = useCallback(
    ({ key }) => {
      if ((key.toUpperCase() === "BACKSPACE") && (output.length)) {
        console.log(output[output.length - 1]);
        onClickTwo(
          output[output.length - 1].char,
          output[output.length - 1].id
        );
      }
    },
    [output, onClickTwo]
  );
  const handleSpaceKey = useCallback(
    ({ key }) => {
      if (key === " ") {
        shuffle();
      }
    },
    [shuffle]
  );
useEffect(()=>{
  shuffle()
},[shuffle])
  useEffect(() => {
    window.addEventListener("keyup", upHandler);
    window.addEventListener("keyup", handleBackspaceKey);
    window.addEventListener("keyup", handleSpaceKey);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keyup", upHandler);
      window.removeEventListener("keyup", handleBackspaceKey);
      window.removeEventListener("keyup", handleSpaceKey);
    };
  }, [upHandler, handleBackspaceKey, handleSpaceKey]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountDownTimer(countDownTimer - 1);
    }, 1000);
    if (!countDownTimer) {
      if (wordsFound.length >= wordsNeeded) {
        setIsCongratModal(true)
        clearInterval(intervalId)
      }
      else{setGameOver(true)} 
    }
    
    return () => clearInterval(intervalId);
  }, [countDownTimer, wordsFound, wordsNeeded]);
  useEffect(() => {
    if (!output.length) {
      setIsInValid(false);
      return;
    }
    const arr = output.map((letter) => {
      return letter.char;
    });
    const userInput = arr.join("");
    const wordIsValid = anagramWordSolution.includes(userInput);
    const wordIsDuplicate = wordsFound.includes(userInput);
    if (wordIsDuplicate) {
      setIsDuplicate(true);
      setIsInValid(false);
      return;
    } else {
      setIsDuplicate(false);
    }
    if (wordIsValid) {
      setIsInValid(false);
      setScore(score + userInput.length * 100);
      setWordsFound([...wordsFound, userInput]);
      clearOutput();
      setAnagram(previousState);
    }
    setIsInValid(true);
  }, [output, wordsFound, clearOutput, previousState, score]);

  const arr = anagram.map((eachWord, index) => {
    return (
      <Button
        name={eachWord.char}
        id={eachWord.id}
        onClick={onClick}
        index={index}
      />
    );
  });
  const arr2 = output.map((eachWord, index) => {
    return (
      <ButtonTwo
        name={eachWord.char}
        id={eachWord.id}
        onClickTwo={onClickTwo}
        index={index}
      />
    );
  });
  if(nextLevel) {
    return <LoadNextLevel level = {currentLevel+1} scores={score} />
  }
  if(gameOver){
    return <GameOver level={currentLevel} score = {score} wordsNeeded={wordsNeeded} wordsFound={wordsFound.length}/>
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
              <span className="quit-button">X</span>
            </h4>
          </section>
          <section className="output-button-section">
            {arr2.length ? (
              <div className="output-button">{arr2}</div>
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

          <section className="input-button-section">{arr}</section>
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
      <Modal modalTitle={"Congratulations"} displayModal={isCongratModal} 
      modalBody={<><h1>You cleared this level!</h1><p>Words Needed: {wordsNeeded}</p><p>Words Found: {wordsFound.length}</p>
      
      </>}
      modalFooter = {<><button onClick={()=>setNextLevel(true)} className="secondary-button">
      Proceed To the Next Level
    </button></>}

      />
      
      <Modal modalTitle={"Quit Game?"} displayModal={isQuitModal} 
      modalBody={<><h1>Your game will not be saved</h1>
      
      </>}
      modalFooter = {<><button onClick={()=>setNextLevel(true)} className="secondary-button">
      Yes
    </button>
    <button onClick={()=>setNextLevel(true)} className="secondary-button">
      No
    </button>
    </>}

      />
      </section>
          
    </>
  );
};
export default Game;
