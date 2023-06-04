import React from "react";
import "./Input.css";

const Input = (props) => {
  return (
    <div>
      <input
        className="input-field no-spinners"
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        required
        maxlength="45"
      />
    </div>
  );
};

export default Input;
