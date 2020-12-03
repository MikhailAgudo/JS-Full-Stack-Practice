const gameBoard = (() => {
    let board = [];
    let victoryStatus = 0;

    for (let i = 0; i < 9; i++) {
        board.push(0);
    }

    const returnVictory = () => {
        return victoryStatus;
    }

    const returnBoard = () => {
        return board;
    }

    const replaceBoard = (inputBoard) => {
        board = inputBoard;
    }

    const overrideVictory = (inputVictory) => {
        victoryStatus = inputVictory;
    }

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
        returnVictory,
        returnBoard,
        checkVictory
    };
})();

const unitTest = (() => {
    const testVictory = (board, output) => {
        gameBoard.replaceBoard(board);
        gameBoard.overrideVictory(0);
        //console.log(gameBoard.returnBoard());
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