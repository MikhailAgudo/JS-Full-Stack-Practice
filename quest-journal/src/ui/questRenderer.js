import { questStructurer } from './../quest/questStructurer.js';
import { questInterfacer } from './../quest/questInterfacer.js';
import { taskRenderer } from './taskRenderer.js';
import { uiInterfacer } from './uiInterfacer.js';

const questRenderer = (() => {
    // These are global variables because most of the functions
    // need them.
    let questSection = document.createElement("div");
    let taskSection = document.createElement("div");

    const initializeJournal = () => {
        let journalSection = document.querySelector(".journal-section");
        let questSection = createQuestSection();
        let taskSection = createTaskSection();

        journalSection.appendChild(questSection);
        journalSection.appendChild(taskSection);
    }

    const createQuestSection = () => {
        questSection.classList.add("quest-section");

        return questSection;
    }

    const createTaskSection = () => {
        taskSection.classList.add("task-section");

        return taskSection;
    }

    const renderQuestTab = (questTitles) => {
        // The title array indexes should be arranged the same way
        // so there's little need to store indexes. Data sets will
        // gain the index from the actual array arrangement.

        // Not a recursion because we need the index

        resetQuestSection();

        for ( let i = 0; i < questTitles.length; i++) {
            let newQuest = document.createElement("div");
            newQuest.textContent = questTitles[i];
            newQuest.dataset.index = i;

            questSection.appendChild(newQuest);
        }
    }

    const resetQuestSection = () => {
        questSection.innerHTML = "";
    }

    const renderQuest = (index) => {

    }

    return {
        initializeJournal,
        renderQuestTab
    }
})();

export {
    questRenderer
}