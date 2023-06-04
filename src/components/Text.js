import "./Text.css";
import React from "react";

const Text = (props) => {
  return (
    <div>
      <h1>{props.titlePage}</h1>
      <h3>{props.descriptionPage}</h3>
    </div>
  );
};

export default Text;
