import { getFirestore, getDoc, doc, updateDoc, setDoc, collection, deleteDoc, getDocs, where, query, writeBatch } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
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
    deleteRoom(presenter).then(
    signOut(auth).then(function() {
        alert("Sign out successful")
      }).catch(function(error) {
        // An error happened.
        alert(error.message);
      }));
});

async function deleteRoom(presenter)
{
  if (!presenter)
  {
    console.log("User not signed in.");
    return;
  }
  const roomsRef = collection(db, "rooms");
  let q = query(roomsRef, where(`uid`, `==`, `${presenter.uid}`))
  const snapshot = await getDocs(q);
  const batch = writeBatch(db);
  snapshot.forEach((docSnap) => {
    batch.delete(doc(db, "rooms", docSnap.id)); 
    console.log(`Marked for deletion: ${docSnap.id}`); 
  });
  batch.commit(); console.log('All marked documents deleted successfully');
}

setTime.onclick = async function () {
    const pollRef = doc(db, "polls",`${presenter.uid}`);
    if (tpq.value < 10 || tpq.value > 45)
    {
        alert("Time per question out of range. Keep the timer between 10 to 45 seconds.");
        return;
    }
    const time = { time: Number(tpq.value) };
    await setDoc(pollRef, time);
    alert("Time successfully set.");
}

async function getPresenterName(presenter)
{
    if (!presenter)
    {
      console.log("User not signed in.");
    }
    
    nameHTML.textContent = presenter.displayName;
}

document.getElementById("upload").onclick = function(){
    document.location.href = `upload.html`;
  }
document.getElementById("start").onclick = function(){
    document.location.href = 'poll.html'
}