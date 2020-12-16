const Quest = (title) => {
    const SWAP_MAX = 2;
    let tasks = [];
    let swap = [];

    const getTitle = () => {
        return title;
    }

    const getTasks = () => {
        return tasks;
    }

    const getTaskAmount = () => {
        return tasks.length;
    }

    const getTask = (index) => {
        return tasks[index];
    }

    const addTask = (task) => {
        tasks.push(task);
    }

    const removeTask = (index) => {
        tasks.splice(index, 1);
    }

    const queueSwap = (index) => {
        swap.push(index);
    }

    const startSwap = () => {
        const firstIndex = swap.shift();
        const secondIndex = swap.shift();

        let temp = tasks[firstIndex];
        tasks[firstIndex] = tasks[secondIndex];
        tasks[secondIndex] = temp;
    }

    const processSwap = (index) => {
        if (swap.length < SWAP_MAX) {
            queueSwap(index);
        }

        if (swap.length >= SWAP_MAX) {
            startSwap();
        }
    }

    return {
        getTitle,
        getTasks,
        getTaskAmount,
        getTask,
        addTask,
        removeTask,
        processSwap
    }
}

export {
    Quest
}