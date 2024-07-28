console.log("JavaScript Loaded");

const gameData = {
    "gameTitle": "6Clues Movie Trivia",
    "movies": [
        {
            "movieTitle": "Boogie Nights",
            "clues": [
                "Set in Los Angeles' San Fernando Valley",
                "Alfred Molina",
                "Leonardo DiCaprio was the original choice...had to turn it down because of Titanic",
                "Character: Reed Rothchild",
                "Begins in 1977, ends in 1984",
                "Burt Reynolds was nominated for an Academy Award"
            ],
            "answer": "Boogie Nights",
            "currentClueIndex": 0,
            "incorrectAttempts": 0
        },
        {
            "movieTitle": "Million Dollar Baby",
            "clues": [
                "Anthony Mackie",
                "No opening credits after the title is shown",
                "Received the award for Best Picture at the 77th Academy Awards",
                "Screenplay was written by Paul Haggis",
                "Hilary Swank wins her second best actress oscar"
            ],
            "answer": "Million Dollar Baby",
            "currentClueIndex": 0,
            "incorrectAttempts": 0
        }
    ],
    "currentMovieIndex": 0,
    "currentClueIndex": 0
};

let currentGameData = {...gameData};

function startGame() {
    console.log("Game Started");
    currentGameData.currentMovieIndex = 0;
    currentGameData.movies.forEach(movie => {
        movie.currentClueIndex = 0;
        movie.incorrectAttempts = 0;
    });
    nextClue();
}

function nextClue() {
    const movie = currentGameData.movies[currentGameData.currentMovieIndex];
    console.log(`Next Clue: ${movie.movieTitle}`);
    if (movie.currentClueIndex < movie.clues.length) {
        $("#clue").text(`Clue ${movie.currentClueIndex + 1}: ${movie.clues[movie.currentClueIndex]}`);
    } else {
        $("#clue").text(`Out of clues! The correct answer was: ${movie.answer}`);
        currentGameData.currentMovieIndex += 1;
        currentGameData.currentClueIndex = 0;
        if (currentGameData.currentMovieIndex < currentGameData.movies.length) {
            nextClue();
        } else {
            $("#clue").text("Game over!");
        }
    }
}

function submitAnswer() {
    const answer = $("#answer").val().trim().toLowerCase();
    const movie = currentGameData.movies[currentGameData.currentMovieIndex];
    console.log(`Submitted Answer: ${answer}`);
    if (answer === movie.answer.toLowerCase()) {
        $("#response").text("Correct! Moving on to the next movie...");
        currentGameData.currentMovieIndex += 1;
        currentGameData.currentClueIndex = 0;
        if (currentGameData.currentMovieIndex < currentGameData.movies.length) {
            nextClue();
        } else {
            $("#clue").text("Game over!");
        }
    } else {
        $("#response").text("Incorrect. Try again.");
        movie.incorrectAttempts += 1;
        movie.currentClueIndex += 1;
        nextClue();
    }
}

$(document).ready(function() {
    console.log("Document Ready");
    $("#start-game").click(function() {
        startGame();
    });

    $("#submit-answer").click(function() {
        submitAnswer();
    });
});
