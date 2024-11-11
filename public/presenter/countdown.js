import { getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut} from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js';

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

let presenter;
let timer;
let time;
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    presenter = auth.currentUser;
    getTime(presenter);
  } else {
    document.location.href = "login.html";
  }
});



async function getTime(presenter)
{
    if (!presenter)
    {
        return;
    }
    const pollRef = doc(db, "polls",`${presenter.uid}`);
    let snapshot = await getDoc(pollRef);
    let data = snapshot.data();
    time = Number(data.time);
    timer = time;
}

const countdown = document.getElementById('countdown');

setInterval(updateCountdown, 1000);

function updateCountdown() {
    let seconds = timer;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    countdown.textContent = `${seconds}`;
    
    timer--;
    timer = timer < 0 ? time : timer;
}


