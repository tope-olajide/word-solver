import React, { useState } from "react";
const MainNavigationBar = () => {

  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  return (
    <>
      <nav>
        <section className="main-nav">
            <h2 className="logo">Journary</h2>
         
          <div
            id="myNav"
            className="overlay"
            style={isNavOpen ? { width: "100%" } : { width: 0 }}
          >
            <span className="closebtn" onClick={toggleNav}>
              &times;
            </span>
            <div className="overlay-content">
              
            </div>
          </div>
          <div className="menu-icon" onClick={toggleNav}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </section>
      </nav>
    </>
  );
};
export default MainNavigationBar;
