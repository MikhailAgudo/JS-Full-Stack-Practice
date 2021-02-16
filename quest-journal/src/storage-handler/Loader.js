import { questStructurer } from './../quest/questStructurer.js';

const Loader = (() => {
    let questLength = null;
    let taskLengths = [];

    const load = () => {
        loadQuestLength();
        loadTaskLengths(0, questLength);

        loadQuests();
    }

    const loadQuestLength = () => {
        let temp = localStorage.getItem("questLength");

        if ( typeof(temp) === "number" ) {
            temp = parseInt(temp);

            if ( typeof(temp) === "number" ) {
                questLength = temp;
            }
        } else {
            questLength = 0;
        }
    }

    const loadTaskLengths = (start, questLength) => {
        if ( questLength > 0 && typeof(questLength) === "number" ) {
            let startString = String(start);
            let finalKey = "quest" + startString + "taskLength";
    
            let taskLength = localStorage.getItem(finalKey);
    
            taskLengths.push(taskLength);
    
            if ( (start + 1) === questLength ) {
            } else {
                loadTaskLengths((start + 1), questLength);
            }
        }
    }

    const loadQuests = () => {
        for ( let i = 0; i < questLength; i++ ) {
            let indexString = String(i);
            let finalKey = "quest" + i;

            let questTitle = localStorage.getItem(finalKey);

            questStructurer.addQuest(questTitle);

            loadTasks(finalKey, i);
        }
    }

    const loadTasks = (finalKey, questIndex) => {
        let taskLength = taskLengths[questIndex];
        finalKey += "task";

        for ( let i = 0; i < taskLength; i++ ) {
            let finalTaskKey = finalKey + i;
            let taskDescription = localStorage.getItem(finalTaskKey);
            console.log("LOAD:" + taskDescription);

            questStructurer.addTask(taskDescription, questIndex);
        }
    }

    return {
        load
    }
})();

export { Loader }