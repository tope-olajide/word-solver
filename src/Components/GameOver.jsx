import React, { useState } from "react";
import LoadNextLevel from "./LoadNextLevel";
import HomePage from "./HomePage";
/**
 * GameOver component
 * @param  {props} score - integer
 * @param {props} level - integer
 * @param {props} wordsNeeded - integer
 * @param {props} wordsFound - integer
 * @return {object} JSX - GameOver component elements
 * @return {component} HomePage - renders HomePage if isHomePage = true
 */
const GameOver = ({ score, level, wordsNeeded, wordsFound }) => {
  const [isHomePage, setIsHomePage] = useState(false);
  const [isNextLevel, setIsNextLevel] = useState(false);
  const quitGame = () => {
    setIsHomePage(true);
  };
  localStorage.removeItem("savedGame");
  if (isHomePage) {
    return <HomePage />;
  }
  if (isNextLevel) {
    return <LoadNextLevel />;
  }
  return (
    <>
      <section className="main-section">
        <section className="game-container">
          <section className="time-score-section">
            <h4>Time: 0</h4>
            <h4>Level: {level}</h4>
            <h4>Score: {score}</h4>
          </section>
          <section className="output-button-section">
            <div className="game-over">
              <h1>GAME OVER</h1>
              <h3>
                You needed {wordsNeeded} words to advance to the next level, you
                found {wordsFound} {wordsFound > 1 ? "words" : "word"}.
              </h3>
            </div>
          </section>
          <section className="secondary-button-container">
            <button
              className="secondary-button"
              onClick={() => setIsNextLevel(true)}
            >
              Play Again
            </button>
            <button onClick={quitGame} className="secondary-button">
              Exit
            </button>
          </section>
        </section>
      </section>
    </>
  );
};
export default GameOver;
