import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";


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

const button = document.getElementById("submit");
button?.addEventListener("click", clickEvent => {

    // onAuthStateChanged(auth, user => {
    //     if(user == null) { return;}
        
    // });

    let email = document.getElementById("username").value;
    let password= document.getElementById("password").value;
    let confirm = document.getElementById("confirmation").value;

    if (password === confirm)
    {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                // created account successfully
                const user = userCredentials.user;
                alert("Account created");
                document.location.href = `/presenter/login.html`;

            }).catch((error) => {
                //do something here with error
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
    }
    else
    {
        alert("Passwords don't match");
    }
});

