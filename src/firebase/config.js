import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHNduHpRpdHAh5ut7aMRD6Rx_fCT-kico",
  authDomain: "books-29031.firebaseapp.com",
  projectId: "books-29031",
  storageBucket: "books-29031.appspot.com",
  messagingSenderId: "939390761269",
  appId: "1:939390761269:web:dbe933d9ba900d432cb47c",
};
firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();

export { projectFirestore };
