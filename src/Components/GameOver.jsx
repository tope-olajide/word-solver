import React, { useState, useEffect, useCallback } from "react";
import Button from "./commons/Button";
import { ButtonTwo } from "./commons/Button";


const GameOver = ({score, level, wordsNeeded, wordsFound}) => {
  localStorage.removeItem('savedGame')
  
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
                <h1>
                  GAME OVER
                </h1>
                <h3>You needed {wordsNeeded} words to advance to the next level, you found {wordsFound} {wordsFound>1?"words":"word"}.</h3>
              </div>
          </section>
          <section className="secondary-button-container">
            <button className="secondary-button" onClick={null}>Restart</button>
            <button onClick={null} className="secondary-button">Menu</button>
          </section>
        </section>
      </section>
    </>
  );
};
export default GameOver;
