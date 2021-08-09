import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var config = {
    apiKey: "AIzaSyDzD0242Brlj_0Zi99MwR_gup1N8ZkaQrE",
    authDomain: "react-slack-e506a.firebaseapp.com",
    databaseURL: "https://react-slack-e506a-default-rtdb.firebaseio.com",
    projectId: "react-slack-e506a",
    storageBucket: "react-slack-e506a.appspot.com",
    messagingSenderId: "937104717152",
    appId: "1:937104717152:web:059ffafe3e85d928e39a05",
    measurementId: "G-J25YSCGSE0"
  };
  // Initialize Firebase
  firebase.initializeApp(config);


export default firebase;
