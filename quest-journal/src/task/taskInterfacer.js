const taskInterfacer = (() => {
    const strucString = (string) => {
        string = String(string);
        return string;
    }

    const strucDueDate = (dueDate) => {
        return dueDate;
    }

    const strucPriority = (priority) => {
        if (priority > 3) {
            priority = 3;
        } else if (priority < 1) {
            priority = 1;
        }

        return priority;
    }

    return {
        strucString,
        strucDueDate,
        strucPriority
    }
})();

export {
    taskInterfacer
}