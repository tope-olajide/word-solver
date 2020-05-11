import React, { useState, useEffect, useRef } from "react";
import { SecondaryButton } from "../Components/commons/Button";
import Nav from "../Components/Nav";
import LoadNextLevel from "./LoadNextLevel";
import HighScore from "./HighScore";
import About from "./About";
import HowToPlay from "./HowToPlay";
/**
 * HomePage component
 * @return {object} JSX - HomePage component elements
 * @return {component} LoadNextLevel - renders LoadNextLevel if isGameStart = true
 * @return {component} HighScore - renders HighScore if isHighScore = true
 * @return {component} About - renders About if isAbout = true
 * @return {component} HowToPlay - renders HowToPlay if isHowToPlayPage = true
 */
const HomePage = () => {
  const savedGame = JSON.parse(localStorage.getItem("savedGame"));
  const [isGameStart, setIsGameStart] = useState(false);
  const [isContinueGame, setIsContinueGame] = useState(false);
  const [isHighScore, setIsHighScore] = useState(false);
  const [isAbout, setIsAbout] = useState(false);
  const [isHowToPlayPage, setIsHowToPlayPage] = useState(false);
  const buttonRef = useRef();

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      buttonRef.current.textContent = "Light Mode";
    } else {
      buttonRef.current.textContent = "Dark Mode";
    }
  }, []);
  const toggleDarkTheme = () => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      document.documentElement.setAttribute("data-theme", "");
      buttonRef.current.textContent = "Dark Mode";
      localStorage.setItem("theme", "");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      buttonRef.current.textContent = "Light Mode";
      localStorage.setItem("theme", "dark");
      console.log(theme);
    }
  };
  const loadNext = () => {
    setIsGameStart(true);
  };

  const continueGame = () => {
    setIsContinueGame(true);
  };
  if (isGameStart) {
    return <LoadNextLevel />;
  }
  if (isContinueGame) {
    return (
      <LoadNextLevel
        scores={savedGame.currentScores}
        level={savedGame.currentLevel}
      />
    );
  }
  if (isHighScore) return <HighScore />;
  if (isAbout) return <About />;
  if (isHowToPlayPage) return <HowToPlay />;
  return (
    <>
      <Nav />
      <section className="menu-wrapper">
        <section className="home-container">
          <section className="home-title-section">
            <h1>MENU</h1>
          </section>
          <section className="home-button-wrapper">
            <div style={savedGame ? {width:'97%'} : { display: "none" }}>
              <SecondaryButton name="Continue" onClick={continueGame} />
            </div>
            <SecondaryButton name="Start" onClick={loadNext} />
            <SecondaryButton
              name="How to play"
              onClick={() => setIsHowToPlayPage(true)}
            />
            <SecondaryButton name="About" onClick={() => setIsAbout(true)} />
            <SecondaryButton buttonRef={buttonRef} onClick={toggleDarkTheme} />
            <SecondaryButton
              name="High Score"
              onClick={() => setIsHighScore(true)}
            />
          </section>
        </section>
      </section>
    </>
  );
};
export default HomePage;
