const gameBoard = (() => {
    const EMPTY_BOARD = () => {
        // EMPTY_BOARD() is meant to create a new array
        // of 0s, which count as empty values or non-player
        // entries. This will be used for initializing
        // and resetting the board.
        return [0,0,0,0,0,0,0,0,0];
    }

    // The $board is initialized, then $turnStatus is
    // set to 1, which means player 1 goes first.
    // $victoryStatus of 0 because neither player 1
    // nor 2 have won yet.
    let board = EMPTY_BOARD();
    let turnStatus = 1;
    let victoryStatus = 0;

    // $announcer is meant for functions to give things
    // like "Tie!" or "Win!" via $announcer.textContent.
    let announcer = document.querySelector("#announcer");

    const initializeUI = () => {
        // resetBoard() is there so that the $gameBoard from
        // the unit tests is reset.
        resetBoard();

        // Select all the board squares, then give each
        // of them functions via insertGame().
        let boardSquares = document.querySelectorAll(".boardSquare");
        boardSquares = insertGame(boardSquares);
    }

    const insertGame = (boardSquares) => {
        // Iterate through all of the elements in $boardSquares
        // then give each of them events, necessary for when
        // the user/player clicks on the buttons.
        for (let i = 0; i < boardSquares.length; i++) {
            let currentSquare = boardSquares[i];
            currentSquare.addEventListener("click", () => {
                // Set the $boardIndex as the data-attribute
                // of the element, to make it easier to read
                // then placeOnTile() using $boardIndex.
                let boardIndex = currentSquare.dataset.grid;
                placeOnTile(boardIndex);

                // Set the $textContent of the element
                // the same as $board's element, to update
                // the front-end side.
                currentSquare.textContent = board[boardIndex];
            });
        }
        return boardSquares;
    }

    const changeTurn = () => {
        // Change who plays, used when someone places
        // their move.
        if (turnStatus === 1) {
            turnStatus = 2;
        } else {
            turnStatus = 1;
        }
    }

    const checkLegalMoves = () => {
        // Checks if there are still any possible moves,
        // to stop players from setting anything if the game
        // is done, and if it's been a tie.
        for (let i = 0; i < board.length; i++) {
            if (board[i] === 0) {
                return true;
            }
        }
        return false;
    }

    const placeOnTile = (index) => {
        // Check $victoryStatus if no one's won yet,
        // check the board element if it's not already
        // played, then check if there's still any moves
        // that can be done.
        if (victoryStatus === 0 && board[index] === 0 &&
            checkLegalMoves() === true) {
            // Change $board's element into whoever's turn
            // it is (player 1 or 2). Then go to the next
            // player so they can play. Then check for
            // winning conditions.
            board[index] = turnStatus;
            changeTurn();
            checkVictory();
        } else {
            // Basically nothing visible happens.
            console.log("ILLEGAL MOVE");
        }
    }

    const checkPattern = (start, end, increment, checkIncrement) => {
        // checkPattern() is meant to check for horizontal,
        // vertical and diagonal patterns. Instead of
        // creating three different for loop, only one is
        // made with its parameters set as arguments; to
        // give it flexibility and readability.

        // $start is meant for diagonal patterns, because
        // one of the checks start at the 3rd element.
        // $end is where the final pattern's starting
        // element is; $end of vertical checking is
        // "2" because it checks downwards. So, 0, 1 then
        // 2.
        // $increment is important for horizontal patterns
        // where the increments for i should be 3 instead of
        // 1.
        // $checkIncrement is for going through the pattern
        // itself. Vertical checking has its $checkIncrement
        // as "3" so it "goes down" the grid.
        //
        // The grid looks as follow
        // -------------
        // | 0 | 1 | 2 |
        // -------------
        // | 3 | 4 | 5 |
        // -------------
        // | 6 | 7 | 8 |
        // -------------
        for (let i = start; i < end; i += increment) {
            // $checkedValue is meant to make console.log
            // easier to make. They are there for helping
            // to check if the strip of three elements
            // are of the same value.
            const checkedValue = board[i];
            const checkedValue2 = board[i+checkIncrement];
            const checkedValue3 = board[i+(checkIncrement*2)];
            
            if (checkedValue2 === checkedValue && 
                checkedValue3 === checkedValue &&
                board[i] !== 0) {
                victoryStatus = checkedValue;
                announcer.textContent = `Player ${victoryStatus} wins!`
            }
        }
    }

    const checkVictory = () => {
        // Invoke checkVictory() to check
        /// for all patterns.

        // Going down
        checkPattern(0, 3, 1, 3);

        // Going sideways
        checkPattern(0, 7, 3, 1);

        // Diagonals, having the $end be very close
        // to $start means it ends after one iteration. This
        // is why diagonal checking are separate. They
        // start and end differentl, as well as their
        // $checkIncrement.
        // $increment is actually not important because
        // the loop ends immediately.
        checkPattern(0, 1, 1, 4);
        checkPattern(2, 3, 1, 2);

        // Check at the end of the game to give a tie. Otherwise
        // the game just continues endlessly.
        if (checkLegalMoves() === false && victoryStatus === 0) {
            announcer.textContent = "Tie!";
        }
    }

    const returnVictory = () => {
        return victoryStatus;
    }

    const returnBoard = () => {
        return board;
    }

    const replaceBoard = (inputBoard) => {
        // This function is important for unit testing.
        board = inputBoard;
    }

    const overrideVictory = (inputVictory) => {
        victoryStatus = inputVictory;
    }

    const resetBoard = () => {
        board = EMPTY_BOARD();
        turnStatus = 1;
        victoryStatus = 0;
        announcer.textContent = "";
    }

    return {
        initializeUI,
        replaceBoard,
        overrideVictory,
        placeOnTile,
        returnVictory,
        returnBoard,
        checkVictory,
        resetBoard
    };
})();

const unitTest = (() => {
    const simulateMatch = (turnHistory, output) => {
        // Reset the board, then shift $turnHistory
        // as an input to $placeOnTile to simulate a match.
        gameBoard.resetBoard();
        console.log(gameBoard.returnBoard());
        for (let i = 0; i < turnHistory.length; i+=0) {
            console.log(turnHistory[0]);
            gameBoard.placeOnTile(turnHistory.shift());
        }

        // testVictory() to see if the match is the
        // expected output.
        testVictory(gameBoard.returnBoard(), output);
    }

    const testVictory = (board, output) => {
        // Takes a look at the $board then checks patterns.
        // Helps see if the pattern algorithms are working
        // correctly.
        gameBoard.replaceBoard(board);
        gameBoard.overrideVictory(0);
        console.log(gameBoard.returnBoard());
        gameBoard.checkVictory();

        let boardOutput = gameBoard.returnVictory();
        console.log(`Test: ${boardOutput} vs. ${output}`);
        if (boardOutput === output) {
            console.log(`Test passed. ${boardOutput}`);
        } else {
            console.log(`Test failed. ${boardOutput}`)
        }
    }

    return {
        simulateMatch,
        testVictory
    };
})();

const Player = (playerNumber) => {
    // Unused factory function, important for 
    // AIs.
    const getPlayer = () => playerNumber;
}

const circlePlayer = Player(1);
const crossPlayer = Player(2);

unitTest.testVictory([1,0,0,1,0,0,1,0,0], 1);
unitTest.testVictory([0,1,0,0,1,0,0,1,0], 1);
unitTest.testVictory([0,0,1,0,0,1,0,0,1], 1);
unitTest.testVictory([1,1,1,0,0,0,0,0,0], 1);
unitTest.testVictory([0,0,0,1,1,1,0,0,0], 1);
unitTest.testVictory([0,0,0,0,0,0,1,1,1], 1);
unitTest.testVictory([0,1,0,0,0,1,0,1,0], 0);
unitTest.testVictory([1,0,0,0,1,0,0,0,1], 1);
unitTest.testVictory([0,0,1,0,1,0,1,0,0], 1);
unitTest.testVictory([2,0,0,2,0,0,2,0,0], 2);
unitTest.testVictory([0,2,0,0,2,0,0,2,0], 2);
unitTest.testVictory([0,0,2,0,0,2,0,0,2], 2);
unitTest.testVictory([2,2,2,0,0,0,0,0,0], 2);
unitTest.testVictory([0,0,0,2,2,2,0,0,0], 2);
unitTest.testVictory([0,0,0,0,0,0,2,2,2], 2);
unitTest.testVictory([2,0,0,0,2,0,0,0,2], 2);
unitTest.testVictory([0,0,2,0,2,0,2,0,0], 2);
unitTest.simulateMatch([4,8,3,2,5],1);
unitTest.simulateMatch([7,6,4,1,0,8,5,3],0)


gameBoard.initializeUI();