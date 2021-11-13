import firebase from "firebase";
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyAL4mFs6Qv7i6tc9nF_SrkYA8-uWmIP-6A",
    authDomain: "munidex-parking.firebaseapp.com",
    projectId: "munidex-parking",
    storageBucket: "munidex-parking.appspot.com",
    messagingSenderId: "831997585533",
    appId: "1:831997585533:web:5f588c0b151592c3d3a914",
    measurementId: "G-HB1LVLCYCV"
  };


    firebase.initializeApp(firebaseConfig);
     firebase.analytics();

     const storage = firebase.storage()

     const db = firebase.firestore();


  export  {
   db , storage , firebase
 }