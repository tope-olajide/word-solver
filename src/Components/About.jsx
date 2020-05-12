import React, { useState } from "react";
import { SecondaryButton } from "../Components/commons/Button";
import Nav from "../Components/Nav";
import HomePage from "./HomePage";
/**
 * About component
 * @return {object} JSX - About component elements
 * @return {component} HomePage - renders HomePage if isHomePage = true
 */

const About = () => {
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
          <h1>About</h1>
        </section>
        <section className="home-menu-details">
          <p>
            Word-Solver is a word game built with React. It was inspired by
            Chicktionary, a word game I love playing on my brother's PC when I
            was a kid.
          </p>
          <p>The source code is available here: https://github.com/tope-olajide/word-solver </p>
          <p>
            I am available for a freelance project or full-time Gig. Here is my email address: 
            temitope_olajide@outlook.com
          </p>
        </section>
        <SecondaryButton name="Back" onClick={backToHomePage} />
      </section>
    </>
  );
};
export default About;
