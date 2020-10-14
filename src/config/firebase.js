import firebase from 'firebase/app';
import 'firebase/firestore';
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBIAjw5tLizGiPq3KVrfIZ32WDdRjmkkuw",
  authDomain: "turnero-ccj-2996b.firebaseapp.com",
  databaseURL: "https://turnero-ccj-2996b.firebaseio.com",
  projectId: "turnero-ccj-2996b",
  storageBucket: "turnero-ccj-2996b.appspot.com",
  messagingSenderId: "125281157423",
  appId: "1:125281157423:web:373ddad918d0d203b361da"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore()