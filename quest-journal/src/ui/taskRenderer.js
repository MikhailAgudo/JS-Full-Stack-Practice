const taskRenderer = (() => {
    const render = (title, description, dueDate, priority) => {
        // early version of render()
        let task = document.createElement("div");

        let taskTitle = document.createElement("div");
        taskTitle.textContent = title;

        let taskDescription = document.createElement("div");
        taskDescription.textContent = description;

        let taskDueDate = document.createElement("div");
        taskDueDate.textContent = dueDate;

        let taskPriority = document.createElement("div");
        taskPriority.textContent = priority;

        task.appendChild(taskTitle);
        task.appendChild(taskDescription);
        task.appendChild(taskDueDate);
        task.appendChild(taskPriority);

        return task;
    } 
    return {
        render
    }
})();

export { taskRenderer }