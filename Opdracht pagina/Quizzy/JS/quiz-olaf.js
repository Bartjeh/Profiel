let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let username = "";

async function loadQuestions() {
    try {
        const response = await fetch("../JSON/questions.json");
        if (!response.ok) {
            throw new Error("Kon vragen niet laden.");
        }
        questions = await response.json();
        shuffleArray(questions);
    } catch (error) {
        console.error("Fout bij laden van vragen:", error);
    }
}


function shuffleArray(array) {
    array.sort(() => Math.random() - 0.5);
}


function startQuiz() {
    username = document.getElementById("username").value.trim();
    if (username === "") {
        alert("Voer je naam in om te beginnen!");
        return;
    }

    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz-container").style.display = "inline-block";
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endQuiz();
        return;
    }

    const questionData = questions[currentQuestionIndex];
    document.getElementById("question").textContent = questionData.question;

    const multipleChoiceContainer = document.getElementById("multiple-choice-container");
    const answerInput = document.getElementById("answer-input");
    const submitButton = document.getElementById("submit-answer");

    multipleChoiceContainer.innerHTML = "";
    answerInput.value = "";
    answerInput.style.display = "none";
    answerInput.disabled = false;
    submitButton.style.display = "none";
    submitButton.disabled = false;
    document.getElementById("feedback").textContent = "";
    document.getElementById("next").style.display = "none";

    if (questionData.type === "multiple-choice") {
        questionData.answers.forEach((answer, index) => {
            const button = document.createElement("button");
            button.textContent = answer;
            button.onclick = () => checkAnswer(index);
            button.disabled = false;
            multipleChoiceContainer.appendChild(button);
        });

    } else if (questionData.type === "open") {
        answerInput.style.display = "inline-block";
        submitButton.style.display = "inline-block";
    }
}


function checkAnswer(selectedIndex) {
    const questionData = questions[currentQuestionIndex];
    let correct = selectedIndex === questionData.correct;

    if (correct) {
        score++;
        document.getElementById("feedback").textContent = "✅ Correct!";
    } else {
        document.getElementById("feedback").textContent = `❌ Fout! Het juiste antwoord is: ${questionData.answers[questionData.correct]}`;
    }

    document.querySelectorAll("#multiple-choice-container button").forEach(btn => {
        btn.disabled = true;
    });

    document.getElementById("next").style.display = "inline-block";
}


function submitAnswer() {
    const userAnswer = document.getElementById("answer-input").value.trim().toLowerCase();
    const questionData = questions[currentQuestionIndex];
    
    if (!questionData.keywords) {
        questionData.keywords = [questionData.correct.toLowerCase()];
    }

    const correctKeywords = questionData.keywords.map(k => k.toLowerCase());
    let match = correctKeywords.some(keyword => userAnswer.includes(keyword));

    if (match) {
        score++;
        document.getElementById("feedback").textContent = "✅ Correct!";
    } else {
        document.getElementById("feedback").textContent = `❌ Fout! Het juiste antwoord bevat een van deze woorden: ${correctKeywords.join(", ")}`;
    }

    document.getElementById("answer-input").disabled = true;
    document.getElementById("submit-answer").disabled = true;

    document.getElementById("next").style.display = "inline-block";
}


function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}

function endQuiz() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("score-container").style.display = "inline-block";
    document.getElementById("final-score").textContent = `${username}, je score is ${score}/${questions.length}`;

    
    saveScore(username, score);
    showLeaderboard();
}

function saveScore(username, score) {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({ username, score });

    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

function showLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    let leaderboardElement = document.getElementById("leaderboard");
    leaderboardElement.innerHTML = leaderboard.map(player => 
        `<li>${player.username}: ${player.score}</li>`
    ).join("");
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("score-container").style.display = "none";
    document.getElementById("start-screen").style.display = "inline-block";
    location.reload();
}

document.addEventListener("DOMContentLoaded", async () => {
    await loadQuestions();
});