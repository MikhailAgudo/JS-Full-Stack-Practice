import { questStructurer } from './../quest/questStructurer.js';

const Saver = (() => {
    let questAmount = 0;
    let tasks = [];

    const saveQuests = () => {
        updateQuestAmount();

        let quests = questStructurer.getQuests();
        updateTaskAmount(quests);

        for (let i = 0; i < questAmount; i++) {
            let quest = questStructurer.getQuest(i);
            saveQuest(i, quest);
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
        console.log(tasks.length);
        for (let i = 0; i < tasks.length; i++) {
            let finalKey = questFinalKey;
            finalKey += "task";
            finalKey += i;

            localStorage.setItem(finalKey, tasks[i].getDescription());
        }
    }

    const updateQuestAmount = () => {
        questAmount = questStructurer.getQuests().length;
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
        saveQuests,
        resetStorage
    }
})();

export { Saver }