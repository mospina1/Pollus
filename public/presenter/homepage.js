import { getFirestore, getDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
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
const db = getFirestore();
const auth = getAuth();

const nameHTML = document.getElementById("name");
const logout = document.getElementById("logout");
const setTime = document.getElementById("set time");
const tpq = document.getElementById("time per question");

let presenter;
onAuthStateChanged(auth, (user) => {
    if (user)
    {
      const uid = user.uid;
      presenter = auth.currentUser;
      getPresenterName(presenter);
    }
    else
    {
        document.location.href = "login.html";
    }
});

logout?.addEventListener("click", clickEvent => {
    clickEvent.preventDefault();
    signOut(auth).then(function() {
        // Sign-out successful.
        alert("Sign out successful")
      }).catch(function(error) {
        // An error happened.
        alert(error.message);
      });
});

setTime.onclick = async function () {
    const pollRef = doc(db, "polls",`${presenter.uid}`);
    if (tpq.value < 10 || tpq.value > 45)
    {
        alert("Time per question out of range. Keep the timer between 10 to 45 seconds.");
        return;
    }
    const time = { time: Number(tpq.value) };
    await setDoc(pollRef, time);
}

async function getPresenterName(presenter)
{
    if (!presenter)
    {
      console.log("User not signed in.");
    }
    const docRef = doc(db, "presenters",`${presenter.uid}`);
    const snapshot = await getDoc(docRef);
    const data = snapshot.data();
    nameHTML.textContent = data.name;
}

document.getElementById("upload").onclick = function(){
    document.location.href = `upload.html`;
  }
document.getElementById("start").onclick = function(){
    document.location.href = 'poll.html'
}