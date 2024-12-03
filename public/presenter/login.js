import { signInWithEmailAndPassword, getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

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

const back = document.getElementById("back");
back?.addEventListener("click", clickEvent => {
    document.location.href = "../index.html";
});

const create = document.getElementById("create");

create?.addEventListener("click", clickEvent => {
    document.location.href = "signup.html";
});
const button = document.getElementById("submit");
button?.addEventListener("click", clickEvent => {
    clickEvent.preventDefault();
    let email = document.getElementById("email").value;
    let password= document.getElementById("password").value;
    signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
            // logged in successfully            
            alert("Login Successful");
            document.location.href = `/presenter/homepage.html`;
        }).catch(error => {
            //do something here with error
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
});