import React from "react";
import "./Button.css";

{
  /* pomoci parametru menit  barvu tlacitka (color) v ramci barev pomoci props*/
}
{
  /* bez btn2 bez barvy props.color, kdyz to budu volat props.color={red} */
}
const Button = (props) => {
  return (
    <button onClick={props.onClick} className="btn">
      {props.children}
    </button>
  );
};

export default Button;