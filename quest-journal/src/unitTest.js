import { questStructurer } from './quest/questStructurer.js';
import { uiInterfacer } from './ui/uiInterfacer.js';

const unitTest = (() => {
    let testNumber = 0;
    let fails = 0;

    const testOutcome = (outcome) => {
        testNumber++;

        if (outcome === true) {
            console.log(`Test ${testNumber} passed.`);
        } else {
            console.log(`Test ${testNumber} F-A-I-L-E-D.`)
        }
    }

    const printCase = (output, expected) => {
        console.log(`---${output} ~OUTPUT~ vs.`);
        console.log(`---${expected} ~EXP.~`);
    }

    const arrayToStringCase = (array) => {
        if (Array.isArray(array) === true) {
            array = String(array);
        }

        return array;
    }

    const testCase = (output, expected) => {
        output = arrayToStringCase(output);
        expected = arrayToStringCase(expected);

        printCase(output, expected);

        if (output === expected) {
            testOutcome(true);
        } else {
            fails++;
            testOutcome(false);
        }
    }

    const getLatestQuestIndex = () => {
        return questStructurer.quests.length - 1;
    }

    const getLatestTaskIndex = () => {
        return questStructurer.quests[getLatestQuestIndex()].getTaskAmount() - 1;
    }

    const getLatestTaskCount = () => {
        return questStructurer.quests[getLatestQuestIndex()].getTaskAmount();
    }

    const checkQuest = (inputTitle) => {
        questStructurer.addQuest(inputTitle);

        let latestIndex = getLatestQuestIndex()
        let latestQuestTitle = questStructurer.quests[latestIndex].getTitle();

        testCase(latestQuestTitle, inputTitle);
    }

    const checkTask = (inputTitle, inputDescription, inputDueDate, inputPriority) => {
        let latestIndex = getLatestQuestIndex();
        questStructurer.addTask(inputTitle, inputDescription, inputDueDate, inputPriority, latestIndex);

        let latestQuest = questStructurer.quests[latestIndex];
        let latestTask = latestQuest.getTask(getLatestTaskIndex());
        let latestTitle = latestTask.getTitle();
        let latestDescription = latestTask.getDescription();
        let latestDueDate = latestTask.getDueDate();
        let latestPriority = latestTask.getPriority();

        testCase(latestTitle, inputTitle);
        testCase(latestDescription, inputDescription);
        testCase(latestDueDate, inputDueDate);
        testCase(latestPriority, inputPriority);
    }

    const checkQuestCount = (expected) => {
        let count = questStructurer.quests.length;

        testCase(count, expected);
    }

    const checkTaskCount = (expected) => {
        let count = getLatestTaskCount();

        testCase(count, expected);
    }

    const checkRemoveTask = (expected) => {
        questStructurer.removeTask(getLatestQuestIndex(), getLatestTaskIndex());
        let count = getLatestTaskCount();

        testCase(count, expected);
    }

    const checkRemoveQuest = (expected) => {
        questStructurer.removeQuest(getLatestQuestIndex());
        let count = questStructurer.quests.length;

        testCase(count, expected);
    }

    const checkSwapTask = (firstIndex, secondIndex, expectedTitle) => {
        let latestQuest = questStructurer.quests[getLatestQuestIndex()];
        latestQuest.processSwap(firstIndex);
        latestQuest.processSwap(secondIndex);

        let outputTitle = latestQuest.getTask(getLatestTaskIndex()).getTitle();
        testCase(outputTitle, expectedTitle);
    }

    const checkQuestTitleArray = (expected) => {
        let quests = questStructurer.quests;
        let lastIndex = quests.length - 1;
        let questTitles = uiInterfacer.transformToUIReadable(quests, [], lastIndex, "title");

        testCase(questTitles, expected);
    }

    const checkTaskTitleArray = (expected) => {
        let tasks = questStructurer.quests[getLatestQuestIndex()].getTasks();
        let lastIndex = tasks.length - 1;
        let taskTitles = uiInterfacer.transformToUIReadable(tasks, [], lastIndex, "title");

        testCase(taskTitles, expected);
    }

    const checkTaskDescriptionArray = (expected) => {
        let tasks = questStructurer.quests[getLatestQuestIndex()].getTasks();
        let lastIndex = tasks.length - 1;
        let taskTitles = uiInterfacer.transformToUIReadable(tasks, [], lastIndex, "description");

        testCase(taskTitles, expected);
    }

    const testProcess = () => {
        let quest01 = "Bandits Amassing";
        let quest02 = "Vedivoll's Troubles";
        let task01 = "Go to Mindwolf Forest";
        let task02 = "Talk to the Sorceress Elina";
        let desc01 = "You must kill the bandits.";
        let desc02 = "She lives in a hut somewhere in the mountains.";

        checkQuest(quest01);
        checkTask(task01, desc01, Date.now(), 3);
        checkTask(task02, desc02, Date.now(), 2);
        checkSwapTask(0, 1, task01)

        checkTaskTitleArray([task02, task01]);
        checkTaskDescriptionArray([desc02, desc01]);

        checkQuestCount(1);
        checkTaskCount(2);

        checkRemoveTask(1);
        checkRemoveTask(0);

        checkQuest(quest02);

        checkQuestTitleArray([quest01, quest02]);
        
        checkRemoveQuest(1);

        console.log(`Number of failed tests: ${fails}`);
        questStructurer.resetQuests();
    }

    return {
        testProcess
    }
})();

export {
    unitTest
}