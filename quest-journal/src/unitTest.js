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
        console.log(`${output} ~OUTPUT~ vs.`);
        console.log(`${expected} ~EXP.~`);
    }

    const checkQuest = (inputTitle) => {
        questStructurer.addQuest(inputTitle);

        let latestIndex = questStructurer.quests.length - 1;
        let latestQuestTitle = questStructurer.quests[latestIndex].getTitle();

        printCase(latestQuestTitle, inputTitle);

        if (latestQuestTitle === inputTitle) {
            testOutcome(true);
        } else {
            testOutcome(false);
        }
    }

    const checkTask = (inputTitle, inputDescription, inputDueDate, inputPriority) => {

    }

    const testProcess = () => {
        checkQuest("Clear the Cave");
    }

    return {
        testProcess
    }
})();

export {
    unitTest
}