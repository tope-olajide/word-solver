import React, { useState, useEffect, useCallback } from "react";
import { ButtonThree } from "../Components/commons/Button";
import Nav from "../Components/Nav";
import LoadNextLevel from "./LoadNextLevel";
const HomePage = () => {
  const savedGame = JSON.parse(localStorage.getItem('savedGame'));
  console.log(savedGame)
  const loadNext = ()=>{
    setIsStartGame(true)
  }
  const [isStartGame, setIsStartGame] = useState(false);
  const [isContinueGame, setIsContinueGame] = useState(false);
const continueGame = () =>{
  setIsContinueGame(true)
}
  if (isStartGame) {
    return <LoadNextLevel />;
  }if (isContinueGame) {
    return <LoadNextLevel scores = {savedGame.currentScores} level = {savedGame.currentLevel}/>;
  }
  return (
    <>
      <Nav />
      <section className="menu-wrapper">
      <section className="home-container">
        <section className="home-title-section">
          <h1>MENU</h1>
        </section>
        <section className="home-button-wrapper">
        <div style={savedGame?null:{display:"none"}}><ButtonThree name="Continue" onClick = {continueGame} /></div>
          <ButtonThree name="Start" onClick = {loadNext}/>
          <ButtonThree name="How to play" />
          <ButtonThree name="About" />
          <ButtonThree name="Night-Mode" />
          <ButtonThree name="Night-Mode" />
          <ButtonThree name="Night-Mode" />
        </section>
      </section></section>
    </>
  );
};
export default HomePage;
