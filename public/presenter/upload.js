import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js';

const csvFileInput = document.getElementById('csvFileInput');
const output = document.getElementById('output');
const uploadButton = document.getElementById('uploadButton');

csvFileInput.addEventListener('change', handleFileSelect);

    function handleFileSelect(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e)
  {
    const text = e.target.result;
    const data = parseCSV(text);
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