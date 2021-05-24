// Get a RTDB instance
import firebase from 'firebase/app'
import 'firebase/database'
let config = {
    apiKey: "AIzaSyCirv5cJJSbAeLqYevBnoRLqCnSHgoLEQE",
      authDomain: "fir-vue-2153e.firebaseapp.com",
      projectId: "fir-vue-2153e",
      storageBucket: "fir-vue-2153e.appspot.com",
      messagingSenderId: "768217278715",
      appId: "1:768217278715:web:9a9cfcc8db03237be9285e"
  }
export const db = firebase
  .initializeApp(config)
  .database()