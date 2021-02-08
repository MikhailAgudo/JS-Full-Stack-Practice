import { questRenderer } from './questRenderer.js';
import { questStructurer } from './../quest/questStructurer.js';

const functionRenderer = (() => {
    let newQuest = false;
    let newTask = false;

    const toggleQuest = () => {
        if (newQuest === false) {
            newQuest = true;
        } else {
            newQuest = false;
        }
    }

    const toggleTask = () => {
        if (newTask === false) {
            newTask = true;
        } else {
            newTask = false;
        }
    }

    const getNewQuestPrompt = () => {
        return newQuest;
    }

    const getNewTaskPrompt = () => {
        return newTask;
    }

    const createAddQuestButton = () => {
        let questButton = document.createElement("button");
        questButton.textContent = "New Quest";
        questButton.addEventListener("click", (e) => {
            toggleQuest();
            questRenderer.renderQuestTab();
        });

        return questButton;
    }

    const createAddQuestPrompt = () => {
        let promptContainer = document.createElement("div");

        let newInput = createInput("Quest name...");
        let submitQuest = createSubmitQuestButton(newInput);

        promptContainer.appendChild(newInput);
        promptContainer.appendChild(submitQuest);

        return promptContainer;
    }

    const createSubmitQuestButton = (newInput) => {
        let submitQuest = document.createElement("button");
        submitQuest.textContent = "Add";

        submitQuest.addEventListener("click", (e) => {
            questStructurer.addQuest(newInput.value);

            toggleQuest();
            questRenderer.renderQuestTab();
        });

        return submitQuest;
    }

    const createAddTaskButton = () => {
        let taskButton = document.createElement("button");
        taskButton.textContent = "New Task";
        taskButton.addEventListener("click", () => {
            toggleTask();
            questRenderer.renderTaskTab();
        })

        return taskButton;
    }

    const createAddTaskPrompt = () => {
        let promptContainer = document.createElement("div");

        let newInput = createInput("Task name...");
        let submitTask = createSubmitTaskButton(newInput);

        promptContainer.appendChild(newInput);
        promptContainer.appendChild(submitTask);

        return promptContainer;
    }

    const createSubmitTaskButton = (newInput) => {
        let submitTask = document.createElement("button");
        submitTask.textContent = "Add";

        submitTask.addEventListener("click", () => {
            let displayedQuest = questRenderer.getDisplayedQuestIndex();
            questStructurer.addTask(newInput.value, displayedQuest);

            toggleTask();
            questRenderer.renderTaskTab();
        })

        return submitTask;
    }

    const createInput = (placeholder) => {
        let newInput = document.createElement("input");
        newInput.type = "text";
        newInput.placeholder = placeholder;

        return newInput;
    }

    return {
        getNewQuestPrompt,
        getNewTaskPrompt,
        createAddQuestButton,
        createAddQuestPrompt,
        createAddTaskButton,
        createAddTaskPrompt
    }
})();

export { functionRenderer }