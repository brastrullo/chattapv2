import FirebaseContext, { withFirebase } from './context';
import Firebase from './firebase';

export default Firebase;

export { FirebaseContext, withFirebase };

  // const db = firebase.firestore();

  // db.collection('users').get()
  // .then(snapshot => snapshot.docs.map(doc => doc.data()))
  // .then(res => console.log(res))
  // .catch((err) => {
  //   console.log('Error getting documents', err)
  // })

  // firebase.auth().signOut().then(() => console.log('user signed out'))
  // .catch(err => console.log(err))
  
  // firebase.auth().onAuthStateChanged(user => {
  //   if (user) {
  //    console.log("Sign-in provider: " + user.providerId);
  //    console.log("  Provider-specific UID: " + user.uid);
  //    console.log("  Name: " + user.displayName);
  //    console.log("  Email: " + user.email);
  //    console.log("  Anon: " + user.isAnonymous);
  //   } 
  //   if (user != null) {
  //     user.providerData.forEach(function (profile) {
  //       console.log("Other sign-in providers: " + profile.providerId);
  //     })
  //   } else {
  //     console.log('Please sign in.')
  //   }
  // });

  
  // const emailPasswordSignIn = (email, password) => new Promise( (resolve,reject) => {
  //   firebase.auth().signInWithEmailAndPassword(email, password).then(res => resolve(res))
  //   .catch(error => {
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     console.log(errorCode, errorMessage)
  //     reject(`${errorCode}:${errorMessage}`)
  //   })
  // })

  // return { emailPasswordSignIn }


// var user = firebase.auth().currentUser;

// user.updateProfile({
//   displayName: "Jane Q. User",
//   photoURL: "https://example.com/jane-q-user/profile.jpg"
// }).then(function() {
//   // Update successful.
// }).catch(function(error) {
//   // An error happened.
// });