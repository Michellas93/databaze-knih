import React from "react";
import "./Button.css";

const Button = (props) => {
  /* pomoci parametru menit  barvu tlacitka (color) v ramci barev pomoci props*/
  /* bez btn2 bez barvy props.color, kdyz to budu volat props.color={red} */
  const { color, backgroundColor } = props;

  const styles = {
    color: color,
    backgroundColor: backgroundColor,
  };
  return (
    <button style={styles} onClick={props.onClick} className="btn">
      {props.children}
    </button>
  );
};

export default Button;
