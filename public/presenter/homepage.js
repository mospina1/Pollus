import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js';

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

onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      let presenter = auth.currentUser;
      nameHTML.textContent = getPresenterName(presenter);
    } else {
        console.log("Failed")
    }
});

async function getPresenterName(presenter)
{
    if(presenter)
    {
        const docRef = doc(db, "presenters",`${presenter.uid}`);
        const snapshot = await getDoc(docRef);
        const data = snapshot.data();
        console.log(`${data}`);
        nameHTML.textContent = data.name;
        return data;
    }
    console.log("User not signed in.");
    return presenter;
}

document.getElementById("upload").onclick = function(){
    document.location.href = `/presenter/upload.html`;
  }