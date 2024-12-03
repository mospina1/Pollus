import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js';
import { initializeApp} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
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
    document.location.href = "../index.html";
});
const login = document.getElementById("login");
login?.addEventListener("click", clickEvent => {
    document.location.href = "login.html";
});
const button = document.getElementById("submit");
button?.addEventListener("click", clickEvent => {
    let email = document.getElementById("username").value;
    let password= document.getElementById("password").value;
    let confirm = document.getElementById("confirmation").value;
    let name = document.getElementById("name").value;

    if (password === confirm)
    {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                // created account successfully
                updateProfile(userCredentials.user, {
                    displayName: `${name}`
                  });
            }).then(() => {
                alert("Account created");
                document.location.href = `login.html`
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

