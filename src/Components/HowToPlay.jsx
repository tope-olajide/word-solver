import React, { useState } from "react";
import { SecondaryButton } from "../Components/commons/Button";
import Nav from "../Components/Nav";
import HomePage from "./HomePage";
/**
 * HowToPlay component
 * @return {object} JSX - HowToPlay component elements
 * @return {component} HomePage - renders HomePage if isHomePage = true
 */
const HowToPlay = () => {
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
          <h1>How To Play</h1>
        </section>
        <section className="home-menu-details">
          <p>
            {" "}
            Create words from the letters displayed on the buttons either by
            clicking on them(if you are using a mobile phone or tablet), or by
            typing them in with your keyboard(if your using a laptop or desktop
            computer).
          </p>
          <p>
            Once you've assembled a valid word, the word will be automatically
            added it to the word grid. The word grid might not be visible on
            small screen devices. Spell as many words as you can to score
            maximum points!(50 points per letter)
          </p>
          <p>
            To delete a letter, click on the letter on the output grid or click
            on backspace on your keyboard or you can click on the clear button.
          </p>
        </section>
        <SecondaryButton onClick={backToHomePage} name="Back" />
      </section>
    </>
  );
};
export default HowToPlay;
