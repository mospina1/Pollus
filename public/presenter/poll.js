import { getFirestore, getDoc, doc, collection, getDocs, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js';
import "https://cdn.jsdelivr.net/npm/chart.js"

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
    questions;
    index = 0;

    constructor()
    {
        this.questions = [];
    }
    
    nextQuestion()
    {
        this.index++;
    }

    getCurrentQuestion()
    {   let currQuestion = this.questions[this.index];
        return currQuestion;
    }

    getQuestion(index)
    {
        return this.questions[index];
    }

    addQuestion(question)
    {
        this.questions.push(question);
    }
}
let presenter;
let timer;
let time;
let poll = new Poll();
let pollSize;
let pollRef;
onAuthStateChanged(auth, (user) => {
  if (user)
  {
    const uid = user.uid;
    presenter = auth.currentUser;
    pollRef = doc(db, "polls", `${presenter.uid}`);
    getTime(presenter);
    getPoll(presenter);
    hideQuestion();
    checkPoll();
  }
  else
  {
    document.location.href = "login.html";
  }
});

// resumes poll if in progress and starts poll if not in progress
async function checkPoll()
{
    let pollStatus = await getPollStatus();
    console.log(pollStatus)
    if (pollStatus == undefined)
    {
        initializePoll();
        checkPoll();
    }
    if (pollStatus == true)
    {
        hideLobby();
        startCountdown();
        displayPoll();
    }
    else if (pollStatus == false)
    {
        document.getElementById("start-poll")?.addEventListener("click", clickEvent => {
            clickEvent.preventDefault();
            startPoll();
            startCountdown();
            hideLobby();
            displayPoll(); 
        });
    }
}

async function getPollStatus()
{
    let snapshot = await getDoc(pollRef);
    let pollStatus = snapshot.data().ongoingPoll;
    return pollStatus;
}

const purple = "rgba(192, 0, 192, 1)";
const teal = "rgba(0, 192, 192, 1)";
const yellow = "rgba(192, 192, 0, 1)";
const orange = "rgba(192, 128, 0, 1)";

let lobby = document.getElementById("lobby");
let results = document.getElementById("results");
let question = document.getElementById("question");
let text = document.getElementById("text");
let a = document.getElementById("A");
let b = document.getElementById("B");
let c = document.getElementById("C");
let d = document.getElementById("D");
const countdown = document.getElementById('countdown');

async function startCountdown()
{
    setInterval(await updateCountdown, 1000);
}

function hideLobby()
{
    lobby.style.display = "none";
}

function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function initializePoll()
{
    let data = {
            ongoingPoll: false,
            questionIndex: Number(0)
    }
    await updateDoc(pollRef, data);
}

//also set a personal score tracker to the examinee side
// possibly pass the current question to the databse to keep track of the what question the examinee should be on and pass it out to them
async function setQuestion(index)
{
    let curr = poll.getQuestion(index);
    let questionData = {
        question:`${curr.question}`,
        A: `${curr.a}`,
        B: `${curr.b}`,
        C: `${curr.c}`,
        D: `${curr.d}`,
        answer: `${curr.answer}`
      };
    await setDoc(doc(collection(pollRef, "current question"), `question`), questionData);
    let data = { 
        questionIndex: Number(index)
    };
    updateDoc(pollRef, data);
}

async function getQuestionIndex()
{
    let snapshot = await getDoc(pollRef);
    let index = snapshot.data().questionIndex;
    return index;
}

async function displayPoll()
{
    let i = await getQuestionIndex();
    let pollStatus = await getPollStatus();
    while (pollStatus == true)
    {
        if (timer == 0)
        {
            await resetCurrentTime();
        }
        hideResults();
        await displayQuestion();
        await displayCorrectAnswer(poll.getQuestion(i));
        hideQuestion();
        await displayResults();
        i = await getQuestionIndex();
        i += 1;
        if (pollSize <= i)
        {
            hideQuestion();
            hideResults();
            endPoll();
            break;
        }
        setQuestion(i);
        pollStatus = await getPollStatus();
    }
}

async function getCurrentTime()
{
    let snapshot = await getDoc(pollRef);
    let currTime = snapshot.data().currentTime;
    return currTime;
}

async function startPoll()
{
    let data = { 
        ongoingPoll: true,
        currentTime: Number(time),
        questionIndex: Number(0)
    }
    await updateDoc(pollRef, data);
    setQuestion(0);
    await resetCurrentTime();
}

async function endPoll()
{
    await updateDoc(pollRef, { ongoingPoll: false });
    results.style.display = "block";
    results.innerHTML += "<h1>You can export the results from the Presenter Homepage.</h1>";
    results.innerHTML += "<p>Press the Go Back Button to go to the Presenter Homepage.</p>"
    results.innerHTML += '<button id="back">Go Back</button>';
    let back = document.getElementById("back");
    back.onclick = function() {
        document.location.href = "homepage.html";
    }
}

function hideQuestion()
{
    question.style.display = "none";
}

function generateRandomOption(letters)
{
    const randomIndex = Math.floor(Math.random() * letters.length);
    console.log(letters);
    return letters[randomIndex];
}

// after timer is up all wrong answers will light up one by one red(every .25 seconds), while the correct answer lights up last
async function displayCorrectAnswer(question)
{
    let options = "ABCD";
    let option = generateRandomOption(options);
    while(options.length > 1)
    {
        if (question.answer.includes(option))
        {
            option = generateRandomOption(options);
        }
        else
        {
            switch(option)
            {
                case "A":
                    options = options.replace("A", "");
                    a.style.backgroundColor = "rgb(192,0,0)";
                    break;
                case "B":
                    options = options.replace("B", "");
                    b.style.backgroundColor = "rgb(192,0,0)";
                    break;
                case "C":
                    options = options.replace("C", "");
                    c.style.backgroundColor = "rgb(192,0,0)";
                    break;
                case "D":
                    options= options.replace("D", "");
                    d.style.backgroundColor = "rgb(192,0,0)";
                    break;
            }
            await sleep(333);
            option = generateRandomOption(options);
        }
    }
    switch(options[0])
    {
        case "A":
            a.style.backgroundColor = "rgb(0,192,0)";
            break;
        case "B":
            b.style.backgroundColor = "rgb(0,192,0)";
            break;
        case "C":
            c.style.backgroundColor = "rgb(0,192,0)";
            break;
        case "D":
            d.style.backgroundColor = "rgb(0,192,0)";
            break;
    }
    await sleep(2000);
}

async function resetCurrentTime()
{
    await updateDoc(pollRef, { currentTime: Number(time)})
}

function hideResults()
{
    results.style.display = "none";
    results.innerHTML = "";
}

async function displayResults()
{
    results.style.display = "block";
    results.innerHTML += `<canvas id = "graph"></canvas>`

    let ctx = document.getElementById('graph');
    let chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels:['A','B','C','D'],
            datasets: [
                {
                    label: "Answers Chosen",
                    data: [4, 5, 6, 3],
                    borderColor: [purple, teal, yellow, orange],
                    backgroundColor: [purple, teal, yellow, orange],
                    borderWidth: 1
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    for (let i = 5; i > 0; i--)
    {
        console.log(i);
        await sleep(1000);
    }
}

async function displayQuestion()
{
    question.style.display = "block";
    let currQuestion = await getCurrentQuestion(presenter);
    text.textContent = currQuestion.question;
    a.textContent = currQuestion.a;
    b.textContent = currQuestion.b;
    c.textContent = currQuestion.c;
    d.textContent = currQuestion.d;
    a.style.backgroundColor = purple;
    b.style.backgroundColor = teal;
    c.style.backgroundColor = yellow;
    d.style.backgroundColor = orange;
    timer = await getCurrentTime();
    await sleep(timer * 1000);
}

async function getTime(presenter)
{
    if (!presenter)
    {
        return;
    }
    let snapshot = await getDoc(pollRef);
    let data = snapshot.data();
    time = Number(data.time);
}

async function updateCountdown()
{
    timer = await getCurrentTime();
    let seconds = timer;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    countdown.textContent = `${seconds}`;
    
    timer--;
    timer = timer < 0 ? 0 : timer;

    let data = { 
        currentTime: Number(timer),
     };
    updateDoc(pollRef, data);
}

async function getQuestion(pollRef, index)
{
    const questionRef = doc(pollRef, `Question ${index}`);
    let snapshot = await getDoc(questionRef);
    let data = snapshot.data();
    let question = new Question(data.question, data.A, data.B, data.C, data.D, data.answer);
    return question;
}

async function getCurrentQuestion(presenter)
{
    if (!presenter)
    {
        return;
    }
    let snapshot = await getDoc(doc(collection(pollRef, "current question"), `question`));
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
    const questionsRef = collection(db, `polls/${presenter.uid}/questions`);
    let snapshot = await getDocs(questionsRef);
    pollSize = snapshot.size;
    for (let i = 1; i <= pollSize; i++)
    {
        poll.addQuestion(await getQuestion(questionsRef, i));
    }
}