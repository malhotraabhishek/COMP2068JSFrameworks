const prompt = require('prompt');

// function to get user's selection
function getUserSelection(callback) {
    prompt.get({
        properties: {
            userSelection: {
                description: 'Let\'s play a game! Choose ROCK, PAPER, or SCISSORS.',
                pattern: /^(ROCK|PAPER|SCISSORS)$/i,
                message: 'Invalid choice. Please enter ROCK, PAPER, or SCISSORS.',
                required: true
            }
        }
    }, function (err, result) {
        callback(result.userSelection.toUpperCase());
    });
}

// function to generate computer's selection
function getComputerSelection() {
    const randomNumber = Math.random();

    if (randomNumber <= 0.34) {
        return 'PAPER';
    } else if (randomNumber <= 0.67) {
        return 'SCISSORS';
    } else {
        return 'ROCK';
    }
}

// function to determine the winner
function determineWinner(userSelection, computerSelection) {
    if (userSelection === computerSelection) {
        return "It's a tie";
    } else if (
        (userSelection === 'ROCK' && computerSelection === 'SCISSORS') ||
        (userSelection === 'PAPER' && computerSelection === 'ROCK') ||
        (userSelection === 'SCISSORS' && computerSelection === 'PAPER')
    ) {
        return 'User Wins';
    } else {
        return 'Computer Wins';
    }
}

// play the game
function playGame() {
    // user choice
    getUserSelection(function (userSelection) {
        // computer choice
        const computerSelection = getComputerSelection();

        // display both selections
        console.log('User Selection:', userSelection);
        console.log('Computer Selection:', computerSelection);

        // shows the winner and display the outcome
        const result = determineWinner(userSelection, computerSelection);
        console.log('Results:', result);

        // ask if the user wants to play again
        prompt.get({
            properties: {
                playAgain: {
                    description: result === 'User Wins' ?
                        'Congratulations! You won! Ready for another round?? (yes/no)' :
                        result === "It's a tie" ?
                            "It's a Tie! Ready for another round?? (yes/no)" :
                            'I got you! Ready for another round? (yes/no)',
                    pattern: /^(yes|no)$/i,
                    message: 'Invalid choice. Please enter yes or no.',
                    required: true
                }
            }
        }, function (err, playAgainResult) {
            if (playAgainResult.playAgain.toLowerCase() === 'yes') {
                // play again
                playGame();
            } else {
                // end the game
                console.log('Bye! It was nice to play with you.');
                prompt.stop();
            }
        });
    });
}

// start prompt
prompt.start();

// start game
playGame();