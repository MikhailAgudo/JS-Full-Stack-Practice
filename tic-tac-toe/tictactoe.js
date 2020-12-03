const gameBoard = (() => {
    const EMPTY_BOARD = () => {
        return [0,0,0,0,0,0,0,0,0];
    }

    let board = EMPTY_BOARD();
    let turnStatus = 1;
    let victoryStatus = 0;

    const returnVictory = () => {
        return victoryStatus;
    };

    const returnBoard = () => {
        return board;
    };

    const replaceBoard = (inputBoard) => {
        board = inputBoard;
    };

    const overrideVictory = (inputVictory) => {
        victoryStatus = inputVictory;
    };

    const resetBoard = () => {
        board = EMPTY_BOARD();
        turnStatus = 1;
        victoryStatus = 0;
    }

    const changeTurn = () => {
        if (turnStatus === 1) {
            turnStatus = 2;
        } else {
            turnStatus = 1;
        }
    }

    const placeOnTile = (index) => {
        if (victoryStatus === 0 && board[index] === 0) {
            board[index] = turnStatus;
            changeTurn();
            checkVictory();
        } else {
            console.log("ILLEGAL MOVE");
        }
    };

    const checkPattern = (start, end, increment, checkIncrement) => {
        for (let i = start; i < end; i += increment) {
            const checkedValue = board[i];
            const checkedValue2 = board[i+checkIncrement];
            const checkedValue3 = board[i+(checkIncrement*2)];
            
            //console.log(`${checkedValue},${checkedValue2},${checkedValue3}`)
            
            if (checkedValue2 === checkedValue && 
                checkedValue3 === checkedValue &&
                board[i] !== 0) {
                //console.log(`Victory!`);
                victoryStatus = checkedValue;
            }
        }
    };

    const checkVictory = () => {
        // Going down
        checkPattern(0, 3, 1, 3);

        // Going sideways
        checkPattern(0, 7, 3, 1);

        // Diagonals
        checkPattern(0, 1, 1, 4);
        checkPattern(2, 3, 1, 2);
    };

    return {
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
        gameBoard.resetBoard();
        console.log(gameBoard.returnBoard());
        for (let i = 0; i < turnHistory.length; i+=0) {
            console.log(turnHistory[0]);
            gameBoard.placeOnTile(turnHistory.shift());
        }

        testVictory(gameBoard.returnBoard(), output);
    }

    const testVictory = (board, output) => {
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