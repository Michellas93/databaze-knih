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
    if (bookAuthor && bookPublish && bookTitle && bookPrice) {
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
        setError("Kniha nebyla přidána" + err.message);
      }
    } else {
      setShowWarning(true);
      e.preventDefault();
    }
  };

  // validace, vypise se mi hlaska podle toho co je v inputu, email nebo cena...
  //Regex? co to je? jedna z moznosti pouzivani validace.

  return (
    <div>
      <form onSubmit={submitForm}>
        <div className="container-form">
          <Input></Input>

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
              Vyplňte prosím pole.
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
