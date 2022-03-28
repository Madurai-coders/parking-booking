import firebase from "firebase";
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyAPrIngxy96jjnsbdvkXKpGZwO5DjTMKAU",
    authDomain: "munidexparking-ece1b.firebaseapp.com",
    projectId: "munidexparking-ece1b",
    storageBucket: "munidexparking-ece1b.appspot.com",
    messagingSenderId: "771429229694",
    appId: "1:771429229694:web:9feb0013573a1ce122a42f",
    measurementId: "G-395XVT0LEG"
  };


    firebase.initializeApp(firebaseConfig);
     firebase.analytics();

     const storage = firebase.storage()

     const db = firebase.firestore();


  export  {
   db , storage , firebase
 }