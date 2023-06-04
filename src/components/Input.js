import React from "react";

const Input = (props) => {
  return (
    <div>
      <input
        className="input-field"
        type="text"
        value={props.bookTitle}
        onChange={(e) => props.setBookTitle(e.target.value)}
        placeholder="Název knihy"
        required
      />
      <input
        className="input-field"
        type="text"
        value={props.bookAuthor}
        onChange={(e) => props.setBookAuthor(e.target.value)}
        placeholder="Autor"
        required
      />
      <input
        className="input-field"
        type="text"
        value={props.bookDescribe}
        onChange={(e) => props.setBookDescribe(e.target.value)}
        placeholder="popis"
        required
      />
      <input
        className="input-field no-spinners"
        type="number"
        value={props.bookPrice}
        onChange={(e) => props.setBookPrice(e.target.value)}
        placeholder="cena"
        required
      />
      <input
        className="input-field no-spinners"
        type="number"
        value={props.bookPublish}
        onChange={(e) => props.setBookPublish(e.target.value)}
        placeholder="Rok vydání"
        required
      />
    </div>
  );
};

export default Input;
