import { questStructurer } from './quest/questStructurer.js';

const unitTest = (() => {
    let testNumber = 0;

    const testOutcome = (outcome) => {
        testNumber++;

        if (outcome === true) {
            console.log(`Test ${testNumber} passed.`);
        } else {
            console.log(`Test ${testNumber} failed.`)
        }
    }

    const printCase = (output, expected) => {
        console.log(`---${output} ~OUTPUT~ vs.`);
        console.log(`---${expected} ~EXP.~`);
    }

    const testCase = (output, expected) => {
        printCase(output, expected);
        if (output === expected) {
            testOutcome(true);
        } else {
            testOutcome(false);
        }
    }

    const getLatestQuestIndex = () => {
        return questStructurer.quests.length - 1;
    }

    const getLatestTaskIndex = () => {
        return questStructurer.quests[getLatestQuestIndex()].getTaskAmount() - 1;
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

    const testProcess = () => {
        checkQuest("Clear the Cave");
        checkTask("Go to Mindwolf Forest", "You must kill the bandits.", Date.now(), 3);

        questStructurer.resetQuests();
    }

    return {
        testProcess
    }
})();

export {
    unitTest
}