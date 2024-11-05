// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const website = "https://pollus-cs190.web.app/";
//Examinee Button
document.getElementById("E").onclick = function(){
  document.location.href = `/examinee/homepage.html`;
}
//Presenter Button
document.getElementById("P").onclick = function(){
  document.location.href = `/presenter/signup.html`;
}