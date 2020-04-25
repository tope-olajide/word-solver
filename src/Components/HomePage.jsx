import React, { useState, useEffect, useCallback } from "react";
import {ButtonThree} from '../Components/commons/Button'
import Nav from "../Components/Nav"
const HomePage = () => {
    
  return (
    <>
   <Nav />
      <section className="home-container">
          <section className="home-title-section"><h1>MENU</h1>
          </section>
          <section className="home-button-wrapper">
          <ButtonThree name="Start" />
          <ButtonThree name="How to play" />
          <ButtonThree name="About" />
          <ButtonThree name="Sign up" />
          <ButtonThree name="Sign in" />
          <ButtonThree name="High Scores" />
          <ButtonThree name="Night-Mode" />
          </section>
      </section>
    </>
  );
};
export default HomePage;
