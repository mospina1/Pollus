import { getAuth, signInAnonymously  } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBlGRwzi9bkETIXnjWPHST3g1sqVkkYCY4",
    authDomain: "pollus-cs190.firebaseapp.com",
    projectId: "pollus-cs190",
    storageBucket: "pollus-cs190.appspot.com",
    messagingSenderId: "189842869857",
    appId: "1:189842869857:web:8678b7ac814788ed14e420",
    measurementId: "G-LWWGNLWPEG"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

const db = getFirestore();

const back = document.getElementById("back");
back?.addEventListener("click", clickEvent => {
    document.location.href = "../index.html"
});


const button = document.getElementById("submit");

button?.addEventListener("click", clickEvent => {
    let name = document.getElementById("name").value;
    signInAnonymously(auth)
        .then((userCredentials) => {
            // created account successfully
            const user = userCredentials.user;
            const userDoc = doc(db, "examinees",`${user.uid}`);
            const userData = {name: `${name}`};
            setDoc(userDoc, userData).then(() => {
                console.log(`Hi ${name}!`);
            }).catch((error => {
                alert(error.message);
            }));
        }).then(() => {
            alert("Successfully Joined Lobby");
            document.location.href = `lobby.html`
        }).catch((error) => {
            //do something here with error
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });    
    });
