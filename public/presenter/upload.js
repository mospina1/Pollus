import { getFirestore, getDoc, getDocs, doc, setDoc, collection, deleteDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
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

let presenter;
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    presenter = auth.currentUser;
  } else {
    document.location.href = "login.html";
  }
});

const csvFileInput = document.getElementById('csvFileInput');
const output = document.getElementById('output');
const uploadButton = document.getElementById('uploadButton');

csvFileInput.addEventListener('change', handleFileSelect);

// poll uploading
let data;

uploadButton.onclick = function() {
  uploadPoll(presenter);
};

async function deletePoll(presenter)
{
  if (!presenter)
    {
      console.log("User not signed in.");
      return;
    }
    const pollRef = doc(db, "polls",`${presenter.uid}`);
    const questionsColl = collection(pollRef, "questions");
    const snapshot = await getDocs(questionsColl);
    for (let i = 0; i < snapshot.size; i++)
    {
      await deleteDoc(doc(questionsColl, `Question ${i + 1}`));
    }
}

async function uploadPoll(presenter)
{
  if (!presenter)
  {
    console.log("User not signed in.");
    return;
  }
  if (data == null)
  {
    alert("No CSV file uploaded")
    return;
  }
  await deletePoll(presenter);
  const pollRef = doc(db, "polls",`${presenter.uid}`);
  const questionsColl = collection(pollRef, "questions");
  // const keys = data[0].keys
  let pollData = [];
  

  for (let row = 0; row < data.length; row++)
  {
    let values = Object.values(data[row]);
    console.log(values);
    let question = {
      question:`${values[0]}`,
      A: `${values[1]}`,
      B: `${values[2]}`,
      C: `${values[3]}`,
      D: `${values[4]}`,
      answer: `${values[5]}`
    };
    pollData.push(question);
  }

  if (pollData.length == 0)
  {
    alert("No data in CSV file");
    return;
  }
  else if (pollData.length > 20)
  {
    alert("Too many questions in poll. Maximum of 20 questions.")
  }
  
  for (let i = 0; i < pollData.length; i++)
  {
    await setDoc(doc(questionsColl, `Question ${i + 1}`), pollData[i]);
  }
  alert("Upload successful")
}

// poll parsing
function handleFileSelect(event)
{
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e)
  {
    removeTableData();
    const text = e.target.result;
    data = parseCSV(text);
    displayData(data);
  };

  reader.readAsText(file);
}

function parseCSV(text)
{
  const lines = text.split('\n');
  const headers = lines[0].split(',');

  const data = [];
  for (let i = 1; i < lines.length; i++)
    {
      const values = lines[i].split(',');
      const keys = {};

      for (let j = 0; j < headers.length; j++)
      {
        keys[headers[j]] = values[j];
        
      }

    data.push(keys);
  }

  return data;
}

function displayData(data) 
{
  output.innerHTML += `<tr><th>${Object.keys(data[0]).join('</th><th>')}</th></tr>`;

  for (let i = 0; i < data.length; i++)
  {
    output.innerHTML += `<tr><td>${Object.values(data[i]).join('</td><td>')}</td></tr>`;
  }
}

function removeTableData()
{
  output.innerHTML = "";
}