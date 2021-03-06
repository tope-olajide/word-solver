import React, { useState, useEffect } from "react";
import Game from "./Game";
import HomePage from "./HomePage";
import anagrams from "../utils/anagrams";

/**
 * Home component
 * @param {props} level - integer
 * @param {props} scores - integer
 * @return {object} JSX - Home component elements
 * @return {component} Homepage - renders Homepage if isHomePage = true
 * @return {component} Game - renders Game if isHomePage = true
 */
const Home = ({ level, scores }) => {

  const currentLevel = level || 1;
  const [isGameOn, setIsGameOn] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);
  const [anagramWordSolution, setAnagramWordSolution] = useState();
  const [anagramWordWithId, setAnagramWordWithId] = useState();
  const wordsNeeded = 5 + currentLevel;
  const currentScores = scores || 0;
  useEffect(() => {
    const anagramWordsAndSolution = anagrams[Math.floor(Math.random() * (anagrams.length ))]
    
    const anagram = anagramWordsAndSolution.word;
    const anagramWordSolution = anagramWordsAndSolution.solutions;
    setAnagramWordSolution(anagramWordSolution)
      /* Assigns id to each letter, to uniquely identify 
    each letter a user clicks on, incase a letter appear more than once */
       const anagramWordWithId = anagram.split("").map((alphabet, index) => {
        return { letter: alphabet, id: `00${index}` };
      }); 
      setAnagramWordWithId(anagramWordWithId)
      }, []);
      
  const startGame = () => {
    setIsGameOn(true);
  };
  const saveAndQuitGame = () => {
    const gameStatus = {
      currentScores,
      currentLevel,
    };
    localStorage.setItem("savedGame", JSON.stringify(gameStatus));
    setIsHomePage(true);
  };
  if (isGameOn) {
    return (
      <Game
        currentLevel={currentLevel}
        wordsNeeded={wordsNeeded}
        currentScores={currentScores}
        anagramWord = {anagramWordWithId}
        anagramWordSolution = {anagramWordSolution}
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
            <h4>Time: 0</h4>
            <h4>Score: {currentScores}</h4>
          </section>
          <section className="output-button-section">
            <div className="next-level">
              <h1 className="next-level-info">
                Level: <span>{currentLevel}</span>
              </h1>
              <h1 className="next-level-info">
                Words Needed To advance: <span> {wordsNeeded}</span>
              </h1>
              <h1 className="next-level-info">
                Time (seconds): <span>60</span>
              </h1>
            </div>
          </section>
          <section className="secondary-button-container">
            <button className="secondary-button" onClick={startGame}>
              Proceed
            </button>
            <button onClick={saveAndQuitGame} className="secondary-button">
              Save and Quit
            </button>
          </section>
        </section>
      </section>
    </>
  );
};
export default Home;
