import React from "react";
import HomePage from "../src/Components/HomePage";

function App() {
  const theme = localStorage.getItem("theme");
  document.documentElement.setAttribute("data-theme", theme);
  return (
    <>
      <HomePage />
    </>
  );
}

export default App;
