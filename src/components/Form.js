import React from "react";
import { useState } from "react";
import { projectFirestore } from "../firebase/config";
import "./Form.css";
import Input from "./Input";

const Form = () => {
  const [error, setError] = useState(false);
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookPublish, setBookPublish] = useState(null);
  const [bookDescribe, setBookDescribe] = useState("");
  const [bookPrice, setBookPrice] = useState(null);
  const [showWarning, setShowWarning] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();

    const oneBook = {
      title: bookTitle,
      author: bookAuthor,
      publish: bookPublish,
      describe: bookDescribe,
      price: bookPrice,
    };

    try {
      await projectFirestore.collection("books").add(oneBook);
      setBookTitle("");
      setBookAuthor("");
      setBookPublish("");
      setBookDescribe("");
      setBookPrice("");
      setShowWarning(false);
    } catch (err) {
      setShowWarning(true);
      setError("Kniha nebyla přidána" + err.message);
    }
  };

  const handleChange = (index, value) => {
    if (inputs[index].placeholder === "Title") {
      setBookTitle(value);
    } else if (inputs[index].placeholder === "Author") {
      setBookAuthor(value);
    } else if (inputs[index].placeholder === "Description") {
      setBookDescribe(value);
    } else if (inputs[index].placeholder === "Price") {
      setBookPrice(value);
    } else if (inputs[index].placeholder === "Published") {
      setBookPublish(value);
    }
  };

  const inputs = [
    { placeholder: "Title", type: "text", value: bookTitle },
    { placeholder: "Author", type: "text", value: bookAuthor },
    { placeholder: "Description", type: "text", value: bookDescribe },
    { placeholder: "Price", type: "number", value: bookPrice },
    { placeholder: "Published", type: "number", value: bookPublish },
  ];

  //Regex? co to je? jedna z moznosti pouzivani validace.

  return (
    <div>
      <form onSubmit={submitForm}>
        <div className="container-form">
          {inputs.map((inpt, index) => (
            <Input
              key={index}
              type={inpt.type}
              value={inpt.value}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={inpt.placeholder}
            />
          ))}

          <button
            className="btn-submit"
            disable={!bookAuthor || !bookPublish || !bookTitle || !bookPrice}
            type="submit"
          >
            Submit
          </button>
        </div>
        <div>
          {/* doprostred */}
          {showWarning && (
            <p className="showWarning" style={{ color: "red" }}>
              {error}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
