// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const firebase = require("firebase/app");
const admin = require('firebase-admin');
const functions = require('firebase-functions');

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

const initFirebase = () => {
  // Initialize Firebase
  admin.initializeApp(functions.config().firebase);
  
  var db = admin.firestore();
console.log('asdf')
  db.collection('users').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
}
module.exports = initFirebase

// const firebaseConfig = {
//   apiKey: "AIzaSyDTXLAohYLUy6Bec-q0wNeuPW50evLJJ_8",
//   authDomain: "chatappv2-a23c4.firebaseapp.com",
//   databaseURL: "https://chatappv2-a23c4.firebaseio.com",
//   projectId: "chatappv2-a23c4",
//   storageBucket: "chatappv2-a23c4.appspot.com",
//   messagingSenderId: "341465684239",
//   appId: "1:341465684239:web:e505c487d29c112c"
// };