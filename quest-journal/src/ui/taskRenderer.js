const taskRenderer = (() => {
    const render = (task) => {
        // early version of render()
        let newTask = document.createElement("div");

        let taskTitle = document.createElement("div");
        taskTitle.textContent = task.getTitle();

        let taskDescription = document.createElement("div");
        taskDescription.textContent = task.getDescription();

        let taskDueDate = document.createElement("div");
        taskDueDate.textContent = task.getDueDate();

        let taskPriority = document.createElement("div");
        taskPriority.textContent = task.getPriority();

        task.appendChild(taskTitle);
        task.appendChild(taskDescription);
        task.appendChild(taskDueDate);
        task.appendChild(taskPriority);

        return newTask;
    } 
    return {
        render
    }
})();

export { taskRenderer }