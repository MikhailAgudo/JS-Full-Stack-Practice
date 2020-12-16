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

    const resetQuests = () => {
        quests = [];
    }

    const addTask = (title, description, dueDate, priority, index) => {
        title = taskInterfacer.strucString(title);
        description = taskInterfacer.strucString(description);
        dueDate = taskInterfacer.strucDueDate(dueDate);
        priority = taskInterfacer.strucPriority(priority);

        let newTask = Task(title, description, dueDate, priority);

        quests[index].addTask(newTask);
    }

    const removeTask = (questIndex, taskIndex) => {
        quests[questIndex].removeTask(taskIndex);
    }

    const getTask = (questIndex, taskIndex) => {
        
    }

    const renameTitle = (questIndex, taskIndex, title) => {
        title = taskInterfacer.strucString(title);

        quests[questIndex].getTask(taskIndex).setTitle(title);
    }

    const changeDescription = (questIndex, taskIndex, description) => {
        description = taskInterfacer.strucString(description);

        quests[questIndex].getTask(taskIndex).setDescription(description);
    }

    const changeDate = (questIndex, taskIndex, dueDate) => {
        dueDate = taskInterfacer.strucDueDate(dueDate);

        quests[questIndex].getTask(taskIndex).setDueDate(dueDate);
    }

    const changePriority = (questIndex, taskIndex, priority) => {
        priority = taskInterfacer.strucPriority(priority);

        quests[questIndex].getTask(taskIndex).setPriority(priority);
    }

    return {

    }
})();

export {
    questStructurer
}