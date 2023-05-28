import React from "react";
import { useState } from "react";
import { projectFirestore } from "../firebase/config";
import "./Form.css";
import Button from "./Button";

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

  return (
    <div>
      <form onSubmit={submitForm}>
        <div className="container-form">
          <input
            className="input-field"
            type="text"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            placeholder="Název knihy"
          />
          <input
            className="input-field"
            type="text"
            value={bookAuthor}
            onChange={(e) => setBookAuthor(e.target.value)}
            placeholder="Autor"
          />
          <input
            className="input-field"
            type="text"
            value={bookDescribe}
            onChange={(e) => setBookDescribe(e.target.value)}
            placeholder="popis"
          />
          <input
            className="input-field"
            type="text"
            value={bookPrice}
            onChange={(e) => setBookPrice(e.target.value)}
            placeholder="cena"
          />
          <input
            className="input-field"
            type="text"
            value={bookPublish}
            onChange={(e) => setBookPublish(e.target.value)}
            placeholder="Rok vydání"
          />
        </div>
        <div>
          {/* doprostred */}
          {showWarning && (
            <p className="showWarning" style={{ color: "red" }}>
              Vyplňte prosím pole.
            </p>
          )}

          <Button
            color="white"
            backgroundColor="#337ab7"
            disable={!bookAuthor || !bookPublish || !bookTitle || !bookPrice}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
