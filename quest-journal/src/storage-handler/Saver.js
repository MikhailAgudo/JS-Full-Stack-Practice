import { questStructurer } from './../quest/questStructurer.js';

const Saver = (() => {
    let questLength = 0;
    let tasks = [];

    const saveQuests = () => {
        resetStorage();

        saveLengths();

        for (let i = 0; i < questLength; i++) {
            let quest = questStructurer.getQuest(i);
            saveQuest(i, quest);
        }
    }

    const saveLengths = () => {
        updateQuestAmount();
        updateTaskAmount();

        saveQuestLength();
        saveTaskLengths(0);
    }

    const saveQuestLength = () => {
        localStorage.setItem("questLength", questLength);
    }

    const saveTaskLengths = (indexStart) => {
        let indexString = String(indexStart);
        let finalKey = "quest" + indexString;

        let taskLength = tasks.shift();
        taskLength = String(taskLength);

        finalKey += ("taskLength");

        localStorage.setItem(finalKey, taskLength);

        if (tasks.length === 0) {

        } else {
            saveTaskLengths(indexStart + 1);
        }
    }

    const saveQuest = (questIndex, quest) => {
        questIndex = String(questIndex);

        let finalKey = "quest";

        finalKey += questIndex;

        localStorage.setItem(finalKey, quest.getTitle());
        saveTasks(quest.getTasks(), finalKey);
    }

    const saveTasks = (tasks, questFinalKey) => {
        for (let i = 0; i < tasks.length; i++) {
            let finalKey = questFinalKey;
            finalKey += "task";
            finalKey += i;

            let taskDescription = tasks[i].getDescription();
            console.log("SAVE: " + taskDescription)

            localStorage.setItem(finalKey, taskDescription);
        }
    }

    const updateQuestAmount = () => {
        questLength = questStructurer.getQuests().length;
    }

    const updateTaskAmount = () => {
        let quests = questStructurer.getQuests();

        tasks = [];

        for (let i = 0; i < quests.length; i++) {
            let quest = quests[i];
            let taskAmount = quest.getTaskAmount();
            tasks.push(taskAmount);
        }
    }

    const resetStorage = () => {
        localStorage.clear();
    }

    return {
        saveQuests,
        resetStorage
    }
})();

export { Saver }