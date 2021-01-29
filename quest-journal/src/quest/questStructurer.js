import { Quest } from './Quest.js';
import { Task } from './../task/Task.js';
import { taskInterfacer } from './../task/taskInterfacer.js';
import { questInterfacer } from './questInterfacer.js';

const questStructurer = (() => {
    let quests = [];

    const addQuest = (title) => {
        title = questInterfacer.strucTitle(title);

        let newQuest = Quest(title);

        quests.push(newQuest);
    }

    const removeQuest = (index) => {
        quests.splice(index, 1);
    }

    const getQuests = () => {
        return quests;
    }

    const getQuest = (index) => {
        return quests[index];
    }

    const resetQuests = () => {
        quests = [];
    }

    const addTask = (title, description, dueDate, priority, index) => {
        title = taskInterfacer.strucString(title);
        description = taskInterfacer.strucString(description);
        dueDate = taskInterfacer.strucDueDate(dueDate);
        priority = taskInterfacer.strucPriority(priority);

        let newTask = Task(title, description, dueDate, priority);

        getQuest(index).addTask(newTask);
    }

    const removeTask = (questIndex, taskIndex) => {
        getQuest(questIndex).removeTask(taskIndex);
    }

    const getTask = (questIndex, taskIndex) => {
        // Flagged for cleaning.
        // Seems like a useless function.
        return quests[questIndex].getTask(taskIndex)
    }

    const renameTitle = (questIndex, taskIndex, title) => {
        title = taskInterfacer.strucString(title);

        getTask(questIndex, taskIndex).setTitle(title);
    }

    const changeDescription = (questIndex, taskIndex, description) => {
        description = taskInterfacer.strucString(description);

        getTask(questIndex, taskIndex).setDescription(description);
    }

    const changeDate = (questIndex, taskIndex, dueDate) => {
        dueDate = taskInterfacer.strucDueDate(dueDate);

        getTask(questIndex, taskIndex).setDueDate(dueDate);
    }

    const changePriority = (questIndex, taskIndex, priority) => {
        priority = taskInterfacer.strucPriority(priority);

        getTask(questIndex, taskIndex).setPriority(priority);
    }

    return {
        quests,
        addQuest,
        removeQuest,
        getQuests,
        getQuest,
        resetQuests,
        addTask,
        removeTask,
        renameTitle,
        changeDescription,
        changeDate,
        changePriority
    }
})();

export {
    questStructurer
}