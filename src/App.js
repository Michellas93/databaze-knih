import { projectFirestore } from "./firebase/config";
import { useState, useEffect } from "react";
import Button from "./components/Button";

function App() {
  const [book, setBook] = useState([]);
  const [error, setError] = useState(false);

  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookPublish, setBookPublish] = useState(null);
  const [bookDescribe, setBookDescribe] = useState("");
  const [bookPrice, setBookPrice] = useState(null);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const unsubscribe = projectFirestore.collection("books").onSnapshot(
      (snapshot) => {
        // obratit kod
        if (snapshot.empty) {
          setError("Žádná nová kniha k vypsání");
          setBook([]);
        } else {
          let result = [];
          snapshot.docs.forEach((oneBook) => {
            result.push({ id: oneBook.id, ...oneBook.data() });
          });
          setBook(result);
          setError("");
        }
      },
      (err) => {
        setError(err.message);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  const deleteBook = (id) => {
    projectFirestore.collection("books").doc(id).delete();
  };

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
    <div className="form">
      <h1>Databáze knih</h1>
      <h3>Vyplň všechny údaje a potvrď</h3>
      {/* validace formu */}
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
          {showWarning && <p style={{ color: "red" }}>Vyplňte prosím pole.</p>}
        </div>

        <Button
          disable={!bookAuthor || !bookPublish || !bookTitle || !bookPrice}
          type="submit"
        >
          Submit
        </Button>
      </form>

      {error && <p>{error}</p>}
      <div className="main-container">
        {book.map((oneBook) => {
          const { id, title, author, publish, describe, price } = oneBook;
          return (
            <div className="container" key={id}>
              <div className="container-book">
                <p className="title">
                  <p className="main-title"> {title}</p>
                  <p className="author">{author}</p>
                  <p className="publish">{publish} rok</p>
                  <p className="describe">{describe} </p>
                  <p className="price"> cena: {price} Kč</p>
                </p>
              </div>
              <div className="button">
                <Button onClick={() => deleteBook(id)}>Smazat</Button>
                <Button>Edit</Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
