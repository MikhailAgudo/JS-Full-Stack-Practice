import { questStructurer } from './../quest/questStructurer.js';
import { questRenderer } from './questRenderer.js';

const taskRenderer = (() => {
    const render = (task, displayedQuest, i) => {
        // early version of render()
        let newTask = document.createElement("div");
        newTask.classList.add("task-container");
        let taskDescription = createTaskArea(task.getDescription());

        let deleteButton = createDeleteButton(displayedQuest, i);

        //newTask.appendChild(taskTitle);
        newTask.appendChild(deleteButton);
        newTask.appendChild(taskDescription);
        //newTask.appendChild(taskDueDate);
        //newTask.appendChild(taskPriority);

        return newTask;
    }

    const createDeleteButton = (displayedQuest, i) => {
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Done";
        deleteButton.addEventListener("click", (e) => {
            questStructurer.removeTask(displayedQuest, i);
            questRenderer.renderTaskTab();
        });

        return deleteButton;
    }

    const createTaskArea = (textContent) => {
        let newTaskArea = document.createElement("div");
        newTaskArea.classList.add("task-area");

        newTaskArea.textContent = textContent;

        return newTaskArea;
    }

    return {
        render
    }
})();

export { taskRenderer }