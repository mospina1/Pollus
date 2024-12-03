import { getFirestore, getDoc, doc, collection, getDocs, setDoc, updateDoc, query, where } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
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

class Poll
{
    wrong;
    score;

    constructor()
    {
        this.wrong = [];
        this.score = 0;
    }

    addWrong(question)
    {
        this.wrong.push(question);
    }

    addScore()
    {
        this.score++;
    }
}

let examinee;
let poll = new Poll();
let examineeRef;
let pollRef;
onAuthStateChanged(auth, async (user) => {
    if (user)
    {
        let uid = user.uid;
        examinee = uid;
        console.log(examinee);
        await getRefs(examinee);
        await getExamineeName();
        initializePoll();
        await takePoll();
    }
});

async function getRefs(examinee)
{
    examineeRef = doc(db, "examinees", `${examinee}`);
    let snapshot = await getDoc(examineeRef);
    let data = snapshot.data();
    console.log(data);
    let roomRef = doc(db, "rooms", `${data.currentRoom}`);
    let roomSnap = await getDoc(roomRef);
    let roomData = roomSnap.data();
    pollRef = doc(db, "polls", `${roomData.uid}`);
}

let name = document.getElementById("name");
let lobby = document.getElementById("lobby");
let results = document.getElementById("results");
let question = document.getElementById("question");
let a = document.getElementById("A");
let b = document.getElementById("B");
let c = document.getElementById("C");
let d = document.getElementById("D");
let buttons = [a, b, c, d];

const purple = "rgba(192, 0, 192, 1)";
const teal = "rgba(0, 192, 192, 1)";
const yellow = "rgba(192, 192, 0, 1)";
const orange = "rgba(192, 128, 0, 1)";

async function checkPollStarted()
{
    let pollSnap = await getDoc(pollRef);
    let pollData = pollSnap.data();
    let ongoingPoll = pollData.ongoingPoll;
    return ongoingPoll;
}

async function takePoll()
{
    let questionIndex = await getQuestionIndex()
    let ongoingPoll = await checkPollStarted();
    console.log(ongoingPoll);
    while (ongoingPoll == false)
    {
        ongoingPoll = await checkPollStarted();
        await sleep(500);
    }
    while (ongoingPoll == true)
    {
        hideLobby();
        questionIndex = await getQuestionIndex();
        displayAnswers();
        let selection = "";
        
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                buttons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                selection = button.value;
            });
        });
        console.log(selection);
        let pollSnap = await getDoc(pollRef);
        let timer = pollSnap.data().currentTime;
        if (timer == 0)
        {
            poll.addWrong(questionIndex + 1);
        }
        if (selection !== "")
        {
            let data = { currentSelection : `${selection}` };
            await updateDoc(examineeRef, data);
            await blockSelection(selection);
        }
        ongoingPoll = await checkPollStarted();
        if (ongoingPoll == false)
        {
            hideAnswers();
            endPoll();
            break;
        }
        // await sleep(333); // this is so the read/writes aren't called constantly, but may lead to answers not being submited
    }
}

function displayResults(total)
{
    results.style.display = "block";
    let wrong = document.getElementById("wrong");
    wrong.textContent = poll.wrong;
    let score = document.getElementById("score");
    score.textContent = `${poll.score}/${total}`;
}

function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function blockSelection(selection, questionIndex)
{
    switch (selection)
    {
        case "A":
            a.style.backgroundColor = "rgb(192,192,192)";
            break;
        case "B":
            b.style.backgroundColor = "rgb(192,192,192)";
            break;
        case "C":
            c.style.backgroundColor = "rgb(192,192,192)";
            break;
        case "D":
            d.style.backgroundColor = "rgb(192,192,192)";
            break;
    }
    
    // send the selection to wrong if it is wrong 
    questionRef = doc(pollRef, "current question", "question");
    let snapshot = await getDoc(questionRef);
    let data = snapshot.data();
    let correctAnswer = data.answer;
    if (!correctAnswer.includes(selection))
    {
        poll.addWrong(questionIndex + 1);
    }
    else 
    {
        poll.addScore();
    }
    // blocks selection for the rest of the remaining time
    let pollSnap = await getDoc(pollRef);
    let timer = pollSnap.data().currentTime;
    await sleep(timer * 1000);
}

function initializePoll()
{
    hideAnswers();
    hideResults();
}

function hideResults()
{
    results.style.display = "none";
}

async function getExamineeName()
{
    let  snapshot = await getDoc(examineeRef);
    let data = snapshot.data();
    name.textContent = data.name;
}

async function endPoll()
{
    let questionsRef = await getDocs(collections(pollRef, "questions"));
    let pollSize = questionsRef.size;
    displayResults(pollSize);
}
function hideLobby()
{
    lobby.style.display = "none";
}

async function getQuestionIndex()
{
    let pollSnap = await getDoc(pollRef);
    let pollData = pollSnap.data();
    return pollData.questionIndex;
}

function displayAnswers()
{
    question.style.display = "block";
    a.style.backgroundColor = purple;
    b.style.backgroundColor = teal;
    c.style.backgroundColor = yellow;
    d.style.backgroundColor = orange;
}

function hideAnswers()
{
    question.style.display = "none"
}