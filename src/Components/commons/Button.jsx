import React from "react";

const Button = ({ name, id, onClick, index }) => {
  return (
    <div className="button-wrapper">
      <button style={name===" "?{"visibility":"hidden"}:{"visibility":"visible"}} className={"button"} onClick={() => onClick(name, id, index)}>
        {name}
      </button>
    </div>
  );
};
export const ButtonTwo = ({ name, id, onClickTwo, index }) => {
  return (
    <div className="button-wrapper">
      <button key={id} className="button" onClick={() => onClickTwo(name, id, index)}>
        {name}
      </button>
    </div>
  );
};

export const ButtonThree = ({ name, onClick }) => {
  return (
    <section className="menu-button-wrapper">
      <button className="button" onClick={onClick}>
        {name}
      </button>
    </section>
  );
};

export default Button;
