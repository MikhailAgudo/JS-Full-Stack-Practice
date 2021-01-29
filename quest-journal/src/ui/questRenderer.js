import { questStructurer } from './../quest/questStructurer.js';
import { questInterfacer } from './../quest/questInterfacer.js';
import { taskRenderer } from './taskRenderer.js';
import { uiInterfacer } from './uiInterfacer.js';

const questRenderer = (() => {
    // These are global variables because most of the functions
    // need them.
    let displayedQuest = 0;
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

    const renderQuestTab = () => {
        // The title array indexes should be arranged the same way
        // so there's little need to store indexes. Data sets will
        // gain the index from the actual array arrangement.

        resetQuestTab();

        let questTitles = getQuestTitles();

        renderQuests(questTitles);
    }

    const renderQuests = (questTitles) => {
        // Not a recursion because we need the index
        for ( let i = 0; i < questTitles.length; i++) {
            // have onclick method change $displayedQuest
            // then do renderTaskTab()
            let newQuest = renderQuest(questTitles, i);

            questSection.appendChild(newQuest);
        }
    }

    const renderQuest = (questTitles, index) => {
        let newQuest = document.createElement("button");
        newQuest.textContent = questTitles[index];
        newQuest.dataset.index = index;
        newQuest.addEventListener("click", (e) => {
            changeDisplayedQuest(index);
        })

        return newQuest;
    }

    const renderTaskTab = () => {
        resetTaskTab();

        let tasks = getTasks();

        renderTasks(tasks);
    }

    const renderTasks = (tasks) => {
        for (let i = 0; i < tasks.length; i++) {
            let newTask = taskRenderer.render(tasks[i], displayedQuest, i);

            taskSection.appendChild(newTask);
        }
    }

    const resetQuestTab = () => {
        questSection.innerHTML = "";
    }

    const resetTaskTab = () => {
        taskSection.innerHTML = "";
    }

    const changeDisplayedQuest = (index) => {
        displayedQuest = index;

        let questTitles = getQuestTitles();
        renderQuestTab(questTitles);

        let tasks = getTasks();
        renderTaskTab(tasks);
    }

    const getDisplayedQuestIndex = () => {
        return displayedQuest;
    }

    const getQuestTitles = () => {
        return uiInterfacer.questsToTitles(questStructurer.quests);
    }

    const getTasks = () => {
        return questStructurer.quests[displayedQuest].getTasks();
    }

    return {
        initializeJournal,
        renderQuestTab,
        renderTaskTab,
        getDisplayedQuestIndex,
        getQuestTitles,
        getTasks
    }
})();

export {
    questRenderer
}