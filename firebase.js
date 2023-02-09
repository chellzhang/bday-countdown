import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js'
import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCrIo-GXaL-cdazZ9tgyu--LmWY-6S47uU",
    authDomain: "birthday-countdown-8fdd4.firebaseapp.com",
    databaseURL: "https://birthday-countdown-8fdd4-default-rtdb.firebaseio.com",
    projectId: "birthday-countdown-8fdd4",
    storageBucket: "birthday-countdown-8fdd4.appspot.com",
    messagingSenderId: "674341862913",
    appId: "1:674341862913:web:87a4974675dd5c5a708a00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth()
const db = getDatabase()

export { app, auth, db }
