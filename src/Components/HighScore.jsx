import React, { useState } from "react";
import { SecondaryButton } from "../Components/commons/Button";
import Nav from "../Components/Nav";
import highScore from "../utils/highscore";
import HomePage from "./HomePage";
/**
 * HighScore component
 * @return {object} JSX - HighScore component elements
 * @return {component} HomePage - renders HomePage if isHomePage = true
 */
const HighScore = () => {
  const [isHomePage, setIsHomePage] = useState(false);
  const backToHomePage = () => {
    setIsHomePage(true);
  };
  if (isHomePage) {
    return <HomePage />;
  }
  return (
    <>
      <Nav />
      <section className="home-container">
        <section className="home-title-section">
          <h1>High Score</h1>
        </section>
        <section className="home-menu-details">
          <h1>{highScore()}</h1>
        </section>
        <SecondaryButton name="Back" onClick={backToHomePage} />
      </section>
    </>
  );
};
export default HighScore;
