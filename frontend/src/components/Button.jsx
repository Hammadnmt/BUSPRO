import React from "react";

const Button = ({ onClick, desc }) => {
  return (
    <button className="inputButton" onClick={onClick}>
      {desc}
    </button>
  );
};

export default Button;
