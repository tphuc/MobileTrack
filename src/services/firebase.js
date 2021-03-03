import firebase from 'firebase';
import 'firebase/database'; 
const config = {
  apiKey: "DWc0TlravsQh9x6vJO048zm2Xx28JfcHkYb2zR7Z",
  authDomain: "https://mobiletrack-a0e47.web.app/",
  storageBucket: "mobiletrack-a0e47.appspot.com",
  databaseURL: "https://mobiletrack-a0e47-default-rtdb.europe-west1.firebasedatabase.app/"
};
firebase.initializeApp(config);

const db = firebase.database();
const storage = firebase.storage()
export { db, storage }