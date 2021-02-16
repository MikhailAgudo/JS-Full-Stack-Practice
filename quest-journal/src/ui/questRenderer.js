import { questStructurer } from './../quest/questStructurer.js';
import { taskRenderer } from './taskRenderer.js';
import { functionRenderer } from './functionRenderer.js';
import { uiInterfacer } from './uiInterfacer.js';
import { Structurer } from './../Structurer.js';

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

        Structurer.appendChildren(journalSection, [
            questSection,
            taskSection
        ]);

        renderQuestTab();
        renderTaskTab();
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
        // A good alternative to handling rendering is to
        // push elements into an array and have those be read
        // one by one at the final phase.

        // The title array indexes should be arranged the same way
        // so there's little need to store indexes. Data sets will
        // gain the index from the actual array arrangement.

        resetQuestTab();

        renderNewQuest();

        let questTitles = getQuestTitles();

        renderQuests(questTitles);
    }

    const renderNewQuest = () => {
        let questButton = null;

        if ( functionRenderer.getNewQuestPrompt() === true ) {
            questButton = functionRenderer.createAddPrompt(true);
        } else {
            questButton = functionRenderer.createAddButton(true);
        }
        
        questSection.appendChild(questButton);
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

        renderNewTask();

        let tasks = getTasks();

        renderTasks(tasks);
    }

    const renderNewTask = () => {
        let taskButton = null;

        if ( functionRenderer.getNewTaskPrompt() === true ) {
            taskButton = functionRenderer.createAddPrompt(false);
        } else {
            taskButton = functionRenderer.createAddButton(false);
        }
        
        taskSection.appendChild(taskButton);
    }

    const renderTasks = (tasks) => {
        for ( let i = 0; i < tasks.length; i++ ) {
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
        if ( questStructurer.quests.length > 0 ) {
            return questStructurer.quests[displayedQuest].getTasks();
        } else {
            return [];
        }
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