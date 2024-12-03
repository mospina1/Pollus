import { db } from "./firebase-config.js";
import { doc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

const pollRef = doc(db, "polls", "7IrxALlP2XbrTUnZtUxJ"); // Replace with your actual document ID

// DOM Elements
const questionText = document.getElementById("question-text");
const textAnswersContainer = document.getElementById("text-answers-container");
const answersContainer = document.getElementById("answers-container");
const scoreElement = document.getElementById("score");
let currentScore = 0; // Examinee's score
let currentQuestionIndex = 0; // Tracks current question
let questions = [];
let timePerQuestion = 15; // Default timer

// Listen for Firestore updates to the poll document
onSnapshot(pollRef, (docSnapshot) => {
    if (docSnapshot.exists()) {
        const data = docSnapshot.data();

        // Synchronize questions and time per question
        questions = data.questions || [];
        timePerQuestion = data.timePerQuestion || 15;

        // Show the current question
        showQuestion(currentQuestionIndex);
    }
});

// Show the current question as rectangles A/B/C/D
const showQuestion = (index) => {
    if (index >= questions.length) {
        finishPoll(); // Finish if all questions are answered
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];

    // Display the question
    questionText.textContent = `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`;

    // Clear and populate answer choices
    textAnswersContainer.innerHTML = ""; // Clear previous answers
    currentQuestion.answers.slice(0, 4).forEach((answer, index) => {
        const answerElement = document.createElement("div");
        answerElement.classList.add("answer");
        answerElement.textContent = `${String.fromCharCode(65 + index)}. ${answer}`;
        textAnswersContainer.appendChild(answerElement);
    });

    const question = questions[index];
    const correctAnswer = question.answers[4]; // Correct answer at index 4

    // Render answer rectangles
    renderAnswerButtons(correctAnswer);

    // Start timer
    startTimer(() => {
        // Highlight correct answer when time is up
        highlightCorrectAnswer(correctAnswer);

        // Move to the next question after a short delay
        setTimeout(() => {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        }, 3000); // 3 seconds delay before next question
    });
};

// Render A/B/C/D buttons // Initial code (works)
/*const renderAnswerButtons = (correctAnswer) => {
    answersContainer.innerHTML = ""; // Clear existing buttons

    ["A", "B", "C", "D"].forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "answer-button";

        // Handle answer selection
        button.addEventListener("click", () => {
            button.disabled = true; // Disable after selection
            checkAnswer(option, correctAnswer);
        });

        answersContainer.appendChild(button);
    });
};*/ 

// Render A/B/C/D buttons - Works, another buttons are disabled.
/*const renderAnswerButtons = (correctAnswer) => {
    answersContainer.innerHTML = ""; // Clear existing buttons

    ["A", "B", "C", "D"].forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "answer-button";

        // Handle answer selection
        button.addEventListener("click", () => {
            // Disable all buttons after one is clicked
            const buttons = answersContainer.querySelectorAll(".answer-button");
            buttons.forEach((btn) => {
                btn.disabled = true;
            });

            checkAnswer(option, correctAnswer);
        });

        answersContainer.appendChild(button);
    });
};*/

// All buttons turns grey, then green (correct) and red (wrong) - works
/*const renderAnswerButtons = (correctAnswer) => {
    answersContainer.innerHTML = ""; // Clear existing buttons

    ["A", "B", "C", "D"].forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "answer-button";

        // Handle answer selection
        button.addEventListener("click", () => {
            // Disable all buttons after one is clicked
            const buttons = answersContainer.querySelectorAll(".answer-button");
            buttons.forEach((btn) => {
                btn.disabled = true;
                btn.style.backgroundColor = "grey"; // Turn all disabled buttons grey
            });

            checkAnswer(option, correctAnswer);
        });

        answersContainer.appendChild(button);
    });
};*/

const renderAnswerButtons = (correctAnswer) => {
    answersContainer.innerHTML = ""; // Clear existing buttons

    ["A", "B", "C", "D"].forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "answer-button";

        // Handle answer selection
        button.addEventListener("click", () => {
            // Disable all buttons after one is clicked
            const buttons = answersContainer.querySelectorAll(".answer-button");
            buttons.forEach((btn) => {
                btn.disabled = true;
                btn.style.backgroundColor = "grey"; // Turn all disabled buttons grey
            });

            // Highlight the clicked button as yellow
            button.style.backgroundColor = "blue";

            checkAnswer(option, correctAnswer);
        });

        answersContainer.appendChild(button);
    });
};

// Check if the selected answer is correct
const checkAnswer = (selectedAnswer, correctAnswer) => {
    if (selectedAnswer === correctAnswer) {
        currentScore++;
        scoreElement.textContent = `Your Score: ${currentScore}`;
        console.log("Correct Answer!");
    } else {
        console.log("Wrong Answer!");
    }
};

// Highlight the correct answer after time is up
const highlightCorrectAnswer = (correctAnswer) => {
    const buttons = answersContainer.querySelectorAll(".answer-button");
    buttons.forEach((button) => {
        if (button.textContent === correctAnswer) {
            button.style.backgroundColor = "green"; // Correct answer
        } else {
            button.style.backgroundColor = "red"; // Wrong answers
        }
        button.disabled = true; // Disable all buttons
    });
};

// Timer logic
const startTimer = (onTimeUp) => {
    let remainingTime = timePerQuestion;

    const interval = setInterval(() => {
        console.log(`Time Remaining: ${remainingTime} seconds`);
        remainingTime--;

        if (remainingTime <= 0) {
            clearInterval(interval);
            onTimeUp(); // Call the callback when time is up
        }
    }, 1000);
};

// Finish the poll
const finishPoll = () => {
    console.log("Poll Finished!");
    window.location.href = "finish.html"; // Redirect to finish page
};
