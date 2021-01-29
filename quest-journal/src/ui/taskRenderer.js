import { questStructurer } from './../quest/questStructurer.js';
import { questRenderer } from './questRenderer.js';

const taskRenderer = (() => {
    const render = (task, displayedQuest, i) => {
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

        let deleteButton = createDeleteButton(displayedQuest, i);

        newTask.appendChild(taskTitle);
        newTask.appendChild(taskDescription);
        newTask.appendChild(taskDueDate);
        newTask.appendChild(taskPriority);
        newTask.appendChild(deleteButton);

        return newTask;
    }
    const createDeleteButton = (displayedQuest, i) => {
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "del";
        deleteButton.addEventListener("click", (e) => {
            questStructurer.removeTask(displayedQuest, i);
            questRenderer.renderTaskTab();
        });

        return deleteButton;
    }

    return {
        render
    }
})();

export { taskRenderer }