/* import { db } from "./firebase-config.js";
import { onSnapshot, collection} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

// Get URL Parameters to Check User Role
const urlParams = new URLSearchParams(window.location.search);
const role = urlParams.get("role");

// Reference the Start Poll Button
const startPollBtn = document.getElementById("start-poll-btn");

// Show "Start the Poll" Button for Instructors
if (role === "instructor") {
    startPollBtn.style.display = "block";
}

// Redirect to Poll Page when the button is clicked
startPollBtn.addEventListener("click", () => {
    alert("Starting the poll...");
    window.location.href = "poll-instructor.html"; // Replace with your actual poll page
});

// Reference the examinee list container
const examineeNamesList = document.getElementById("examinee-names");

// Reference the Firestore collection
const lobbyRef = collection(db, "lobby"); 

// Listen for real-time updates
onSnapshot(lobbyRef, (snapshot) => {
    // Clear the list
    examineeNamesList.innerHTML = "";

    // Add each examinee to the list
    snapshot.forEach((doc) => {
        const name = doc.data().name;
        const li = document.createElement("li");
        li.textContent = name;
        examineeNamesList.appendChild(li);
    });
}); */







//This code works for the polling. But the button doesn't show up.

import { db } from "./firebase-config.js";
import { onSnapshot, collection, doc, updateDoc, addDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

// Get URL Parameters to Check User Role
const urlParams = new URLSearchParams(window.location.search);
const role = urlParams.get("role"); // "instructor" or "examinee"

// Reference the Firestore `lobby` collection
const lobbyRef = collection(db, "lobby");

// Reference the Examinee List Container
const examineeNamesList = document.getElementById("examinee-names");

// Listen for Real-Time Updates to the Lobby Collection
onSnapshot(lobbyRef, (snapshot) => {
    // Clear the list
    examineeNamesList.innerHTML = "";

    // Add each examinee to the list
    snapshot.forEach((docSnapshot) => {
        const name = docSnapshot.data().name;
        const li = document.createElement("li");
        li.textContent = name;
        examineeNamesList.appendChild(li);
    });
});

// ----------------------------
// Role-Specific Functionality
// ----------------------------

// 1. Instructor Logic
if (role === "instructor") {
    const startPollBtn = document.getElementById("start-poll-btn");

    // Show the "Start Poll" button
    startPollBtn.style.display = "block";

    // Event Listener for "Start Poll" Button
    startPollBtn.addEventListener("click", async () => {
        try {
            alert("Starting the poll...");

            // Update the `pollStarted` field in Firestore
            const pollStatusRef = doc(db, "lobby", "pollStatus");
            await updateDoc(pollStatusRef, { pollStarted: true });

            // Redirect to the Instructor Poll Page
            window.location.href = "poll-instructor.html";
        } catch (error) {
            console.error("Error starting the poll:", error);
            alert("Failed to start the poll. Please try again.");
        }
    });
}

// 2. Examinee Logic
if (role === "examinee") {
    const joinPollBtn = document.getElementById("join-poll-btn");

    // Initially hide the "Join Poll" button
    joinPollBtn.style.display = "none";

    // Get the Examinee's Name from Local Storage or Prompt
    /*let examineeName = localStorage.getItem("examineeName");
    if (!examineeName) {
        examineeName = prompt("Enter your name:");
        localStorage.setItem("examineeName", examineeName);

        // Add the examinee's name to Firestore
        await addDoc(lobbyRef, { name: examineeName });
    }*/

    // Reference the Shared `pollStatus` Document
    const pollStatusRef = doc(db, "lobby", "pollStatus");

    // Listen for real-time changes to the `pollStatus` document
    onSnapshot(pollStatusRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            
            // Explicitly check if pollStarted is true
            if (data.pollStarted === true) {
                console.log("Poll has started! Showing Join Poll button.");
                joinPollBtn.style.display = "block"; // Show the "Join Poll" button
            } else {
                console.log("Poll has not started yet.");
                joinPollBtn.style.display = "none"; // Hide the button if poll hasn't started
            }
        } else {
            console.error("pollStatus document does not exist!");
        }
    });

    // Event listener for the "Join Poll" button
    joinPollBtn.addEventListener("click", () => {
        console.log("Joining the poll...");
        window.location.href = "poll-examinee.html"; // Redirect to the poll page
    });
}






