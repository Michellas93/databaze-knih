import { projectFirestore } from "./firebase/config";
import { useState, useEffect } from "react";
import Button from "./components/Button";
import Form from "./components/Form";
import Text from "./components/Text";

function App() {
  const [book, setBook] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const unsubscribe = projectFirestore.collection("books").onSnapshot(
      (snapshot) => {
        if (snapshot) {
          let result = [];
          snapshot.docs.forEach((oneBook) => {
            result.push({ id: oneBook.id, ...oneBook.data() });
          });
          setBook(result);
          setError("");
        } else {
          setBook([]);
          setError("Žádná nová kniha k vypsání");
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
  return (
    <div>
      <Text></Text>
      <Form></Form>

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
                <Button
                  color="white"
                  backgroundColor="#337ab7"
                  onClick={() => deleteBook(id)}
                >
                  Smazat
                </Button>
                <Button color="white" backgroundColor="#337ab7">
                  Edit
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
