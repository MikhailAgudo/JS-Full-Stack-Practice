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

        let newInput = createInput("Quest Name...");
        let submitQuest = createSubmitQuestButton(newInput);

        promptContainer.appendChild(newInput);
        promptContainer.appendChild(submitQuest);

        return promptContainer;
    }

    const createInput = (placeholder) => {
        let newInput = document.createElement("input");
        newInput.type = "text";
        newInput.placeholder = placeholder;

        return newInput;
    }

    const createSubmitQuestButton = (newInput) => {
        let submitQuest = document.createElement("button");
        submitQuest.textContent = "Add";

        submitQuest.addEventListener("click", (e) => {
            console.log(newInput.value);
            questStructurer.addQuest(newInput.value);

            toggleQuest();
            questRenderer.renderQuestTab();
        });

        return submitQuest;
    }

    return {
        getNewQuestPrompt,
        getNewTaskPrompt,
        createAddQuestButton,
        createAddQuestPrompt
    }
})();

export { functionRenderer }