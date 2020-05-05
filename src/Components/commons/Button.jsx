import React from "react";
/**
 * InputKeyButton component -
 * @param  {props} letter - string
 * @param {props} id - string
 * @param {props} selectInputButton - function
 * @param {props} index - integer
 * @return {object} JSX - InputKeyButton elements
 */
const InputKeyButton = ({ letter, id, selectInputButton, index }) => {
  return (
    <div className="button-wrapper">
      <button
        style={!letter ? { visibility: "hidden" } : { visibility: "visible" }}
        className={"button"}
        onClick={() => selectInputButton(letter, id, index)}
      >
        {letter}
      </button>
    </div>
  );
};
/**
 * OutputKeyButton component
 * @param  {props} letter - string
 * @param {props} id - string
 * @param {props} selectOutputButton - function
 * @param {props} index - integer
 * @return {object} JSX - OutputKeyButton elements
 */
export const OutputKeyButton = ({ letter, id, selectOutputButton, index }) => {
  return (
    <div className="button-wrapper">
      <button
        key={id}
        className="button"
        onClick={() => selectOutputButton(letter, id, index)}
      >
        {letter}
      </button>
    </div>
  );
};

/**
 * SecondaryButton component
 * @param  {props} name - string
 * @param {props} onClick - function
 * @param {props} buttonRef - function
 * @return {object} JSX - SecondaryButton elements
 */
export const SecondaryButton = ({ name, onClick, buttonRef }) => {
  return (
    <section className="menu-button-wrapper">
      <button className="button" ref={buttonRef} onClick={onClick}>
        {name}
      </button>
    </section>
  );
};

export default InputKeyButton;
