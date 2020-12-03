const gameBoard = (() => {
    const board = [];
    let victoryStatus = 0;

    for (let i = 0; i < 9; i++) {
        board.push(0);
    }

    const checkVictory = (limit, increment, checkIncrement) => {
        for (let i = 0; i < 3; i++) {
            const checkedValue = board[i]
            if (board[i+3] === checkedValue && 
                board[i+6] === checkedValue) {
                victoryStatus = checkedValue;
            }
        }
    };

    return {
        board
    };
})();