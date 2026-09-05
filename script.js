
let secretNumber;
let attempts;
const maxAttempts = 5;

const statusEl = document.getElementById("status");
const attemptsEl = document.getElementById("attempts-left");
const hintEl = document.getElementById("hint-text");
const guessInput = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");
const resetBtn = document.getElementById("reset-btn");

function randomGuess() {
    secretNumber = Math.floor(Math.random() * 10) + 1;  
    attempts = maxAttempts;
    attemptsEl.textContent = attempts.toString();
    statusEl.textContent = "Type a number and see if destiny agrees with you.";
    statusEl.className = "status romantic";
    hintEl.textContent = "Make your first move...";
    guessInput.value = "";
    guessInput.disabled = false;
    guessBtn.disabled = false;
}

function endGame(win) {
    guessInput.disabled = true;
    guessBtn.disabled = true;
    if (win) {
        statusEl.className = "status success";
        statusEl.textContent =
            "Correct! Your crush was secretly thinking of " + secretNumber +
            ". Maybe your hearts are closer than you think ♥";
        hintEl.textContent =
            "You guessed it right! Your crush is also thinking about you!!!";
    } else {
        statusEl.className = "status fail";
        statusEl.textContent =
            "Sorry, you are out of chances! Your crush's number was " + secretNumber + ".";
        hintEl.textContent =
            "Maybe try again… or maybe it's time to send a real text.";
    }
}

function handleGuess() {
    const raw = guessInput.value.trim();

    const userGuess = Number(raw);
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
        statusEl.textContent =
            "The number must be between 1 and 10.";
        return;
    }

    attempts--;
    attemptsEl.textContent = attempts.toString();

    if (userGuess === secretNumber) {
        endGame(true);
        return;
    }

    if (attempts === 0) {
        endGame(false);
        return;
    }

    if (attempts === 1) {
       
        statusEl.textContent =
            "********** It's your last chance, guess it correctly! *********";
        hintEl.textContent = "Last chance! Listen to your heart carefully…";
        return;
    }

    if (userGuess < secretNumber) {
        statusEl.className = "status romantic";
        statusEl.textContent = "Too low! Your crush is thinking a bit higher.";
    } else {
        statusEl.className = "status romantic";
        statusEl.textContent = "Too high! Your crush's number is a little lower.";
    }
    hintEl.textContent = "Remaining attempts: " + attempts;
}

guessBtn.addEventListener("click", handleGuess);
guessInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        handleGuess();
    }
});
resetBtn.addEventListener("click", randomGuess);

randomGuess();
