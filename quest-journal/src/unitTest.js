import { questStructurer } from './quest/questStructurer.js';

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

    const testCase = (output, expected) => {
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

    const testProcess = () => {
        checkQuest("Clear the Cave");
        checkTask("Go to Mindwolf Forest", "You must kill the bandits.", Date.now(), 3);
        checkTask("Talk to the Sorceress Elina", "She lives in a hut somewhere in the mountains.", Date.now(), 2);
        checkSwapTask(0, 1, "Go to Mindwolf Forest")

        checkQuestCount(1);
        checkTaskCount(2);

        checkRemoveTask(1);
        checkRemoveTask(0);
        checkRemoveQuest(0);

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