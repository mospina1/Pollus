import { getAuth,createUserAnonymously } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js';
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

/*
const button = document.getElementById("submit");

button.addEventListener("click", clickEvent => {
    clickEvent.preventDefault(); 
    let entername = document.getElementById("entername").value;
    signInAnonymously(auth,entername)
    then((user)=> {
      document.location.href = "";
    })
})
*/


const button = document.getElementById("submit");

button.addEventListener("click", clickEvent => {
    clickEvent.preventDefault(); 

let name = document.getElementById("entername").value;
    {
        createUserAnonymously(auth)
            .then((userCredentials) => {
                // created account successfully
                const user = userCredentials.user;
                const userDoc = doc(db, `examniee/${user.uid}`);
                const userData = {name: `${name}`}
                setDoc(userDoc, userData).then(() => {
                    console.log(`Hi ${name}!`)
           }).then(() => {
                alert("Successfully Joined");
                document.location.href = `examniee/lobby.html`
            }
    )}
)}
});
