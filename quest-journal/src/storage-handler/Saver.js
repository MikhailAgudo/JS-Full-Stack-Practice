import { questStructurer } from './../quest/questStructurer.js';

const Saver = (() => {
    let quests = 0;
    let tasks = [];

    const saveQuests = () => {
        updateQuestAmount();
        updateTaskAmount();
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

            localStorage.setItem(finalKey, tasks[i].getDescription());
        }
    }

    const updateQuestAmount = () => {
        quests = questStructurer.getQuests().length;
    }

    const updateTaskAmount = (quests) => {
        tasks = [];

        for (let i = 0; i < quests.length; i++) {
            let quest = quests[i];
            let taskAmount = quest.getTaskAmount();
            tasks.unshift(taskAmount);
        }
    }

    const resetStorage = () => {
        localStorage.clear();
    }

    return {

    }
})();

export { Saver }