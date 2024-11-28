import { getFirestore, getDoc, doc, collection, getDocs} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js';

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

class Question
{
    constructor(question, a, b, c, d, answer)
    {
        this.question = question;
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.answer = answer;
    }
}

class Poll
{
    #questions;
    #index = 0;

    constructor()
    {
        this.#questions = [];
    }
    
    nextQuestion()
    {
        this.#index++;
    }

    getCurrentQuestion()
    {   let currQuestion = this.#questions[this.#index];
        return currQuestion;
    }

    addQuestion(question)
    {
        this.#questions.push(question);
    }
}

let presenter;
let timer;
let time;
let poll = new Poll();
onAuthStateChanged(auth, (user) => {
  if (user)
  {
    const uid = user.uid;
    presenter = auth.currentUser;
    getTime(presenter);
    getPoll(presenter).then(displayPoll);
  }
  else
  {
    document.location.href = "login.html";
  }
});

let text = document.getElementById("question");
let a = document.getElementById("A");
let b = document.getElementById("B");
let c = document.getElementById("C");
let d = document.getElementById("D");
const countdown = document.getElementById('countdown');
setInterval(updateCountdown, 1000);

async function displayPoll()
{
    console.log(poll);
    displayQuestion();
    displayCorrectAnswer();
    displayResults();
}
function displayCorrectAnswer()
{

}

function displayResults()
{

}

// after timer is up all wrong answers will light up one by one red(every .25 seconds), while the correct answer lights up last
function displayQuestion()
{
    let currQuestion = poll.getCurrentQuestion()
    console.log(currQuestion);
    text.textContent = currQuestion.question;
    a.textContent = currQuestion.a;
    b.textContent = currQuestion.b;
    c.textContent = currQuestion.c;
    d.textContent = currQuestion.d;
}

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



function updateCountdown()
{
    let seconds = timer;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    countdown.textContent = `${seconds}`;
    
    timer--;
    // timer = timer < 0 ? time : timer;
}

async function getQuestion(pollRef, index)
{
    const questionRef = doc(pollRef, `Question ${index}`);
    let snapshot = await getDoc(questionRef);
    let data = snapshot.data();
    let question = new Question(data.question, data.A, data.B, data.C, data.D, data.answer);
    return question;
}

async function getPoll(presenter)
{
    if (!presenter)
    {
        return;
    }
    const pollRef = collection(db, `polls/${presenter.uid}/questions`);
    let snapshot = await getDocs(pollRef);
    let pollSize = snapshot.size;
    for (let i = 1; i <= pollSize; i++)
    {
        poll.addQuestion(await getQuestion(pollRef, i));
    }
}