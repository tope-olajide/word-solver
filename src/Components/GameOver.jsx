import React, { useState, useEffect, useCallback } from "react";
import Button from "./commons/Button";
import { ButtonTwo } from "./commons/Button";
const anagramWord = "AUORDGA";
const anagramWordSolution = ["GOD", "GUARD", "OUR", "ROAD"];
const words = [
  { char: "A", id: "001" },
  { char: "U", id: "002" },
  { char: "O", id: "003" },
  { char: "R", id: "007" },
  { char: "D", id: "004" },
  { char: "G", id: "005" },
  { char: "A", id: "006" },
];

const wordsWithId = anagramWord.split("").map((letter, index) => {
  return { char: letter, id: `00${index}` };
});
console.log(wordsWithId);
const Home = () => {
  const [anagram, setAnagram] = useState(words);
  const [output, setOutput] = useState([]);
  const [previousState, setPreviousState] = useState(words);
  const [wordsFound, setWordsFound] = useState([]);
  const [wordsNeeded, setWordsNeeded] =  useState(1);
  const [score, setScore] = useState(0);
  const [countDownTimer, setCountDownTimer] = useState(30);
  const [isDuplicate, setIsDuplicate] = useState(false)
  const [isInvalid, setIsInValid] = useState(false);
  const [gameOver, setGameOver] = useState (false);
  const [nextLevel, setNextLevel] = useState (false);
  const clearOutput = useCallback (() => {
    setOutput([]);
    setAnagram(previousState)
},[previousState])
  useEffect (()=> {
    if(!countDownTimer){
       if(wordsFound.length >= wordsNeeded) {
      alert("next-stage")
    }
    return alert(" Game Over")
    }
   
    
    const intervalId = setInterval(()=> {
      setCountDownTimer(countDownTimer -1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [countDownTimer])
  useEffect(() => {
      if(!output.length){
        setIsInValid(false)
          return
      }
    const arr = output.map((letter) => {
      return letter.char;
    });
    const userInput = arr.join("");
    const wordIsValid = anagramWordSolution.includes(userInput);
    const wordIsDuplicate = wordsFound.includes(userInput);
    if (wordIsDuplicate) {
      setIsDuplicate(true)
      setIsInValid(false)
    return
  }
      else {
        setIsDuplicate(false);
      }
    if (wordIsValid) {
      setIsInValid(false)
      setScore(score + userInput.length*100)
      setWordsFound([...wordsFound, userInput])
      clearOutput()
      setAnagram(previousState)
    }
    setIsInValid(true);
  }, [output, wordsFound,clearOutput, previousState, score]);


  const onClick = (char, id, index) => {
    setOutput([...output, { char: char, id: id, index: index }]);
    const modifiedAnagram = [...anagram];
    modifiedAnagram[index] = { char: " " };
    setAnagram(modifiedAnagram);
  };
  const onClickTwo = (char, id) => {
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
  };
// Based on Fisher Yates Method.
// Source => https://w3schools.com/js/js_array_sort.asp
const shuffleWords = () => {
for (let i = previousState.length - 1; i>0; i--) {
    let j = Math.floor(Math.random() * i)
       let k = previousState[i]
        previousState[i] = previousState[j]
        previousState[j] = k;
}
setOutput([]);
setAnagram(previousState);
setPreviousState(previousState)
}
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
  return (
    <>
      <section className="main-section">
        <section className="game-container">
          <section className="time-score-section">
            <h4>Time: {countDownTimer}</h4>
            <h4>Level: {countDownTimer}</h4>
            <h4>Score: {score}</h4>
          </section>
          <section className="output-button-section">
            {arr2.length ? (
              <div className="output-button">{arr2}</div>
            ) : (
              <div className="game-over">
                <h1>
                  GAME OVER
                </h1>
              </div>
            )}
           
          </section>
          <section className="secondary-button-container">
            <button className="secondary-button" onClick={shuffleWords}>Restart</button>
            <button onClick={clearOutput} className="secondary-button">Menu</button>
          </section>
        </section>
      </section>
    </>
  );
};
export default Home;
