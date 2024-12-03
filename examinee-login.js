import { db } from "./firebase-config.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const examineeName = document.getElementById("examinee-name").value;

    if (!examineeName.trim()) {
        alert("Please enter your name.");
        return;
    }

    try {
        // Add examinee to the lobby collection
        const lobbyRef = collection(db, "lobby");
        await addDoc(lobbyRef, { name: examineeName });

        alert(`Welcome, ${examineeName}! Redirecting to the lobby...`);
        window.location.href = "lobby.html?role=examinee"; // Redirect to lobby page
    } catch (error) {
        console.error("Error adding examinee:", error);
        alert(`Error: ${error.message}`);
    }
});
