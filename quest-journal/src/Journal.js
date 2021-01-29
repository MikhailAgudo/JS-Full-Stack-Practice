import { questStructurer } from './quest/questStructurer.js';
import { questRenderer } from './ui/questRenderer.js';
import { uiInterfacer } from './ui/uiInterfacer.js';

const Journal = (() => {
    const initializeJournal = () => {
        questRenderer.initializeJournal();
        addSampleQuests();
        initializeQuests();
    }

    const initializeQuests = () => {
        let questTitles = uiInterfacer.questsToTitles(questStructurer.quests);

        questRenderer.renderQuestTab(questTitles);

        let displayedQuest = questRenderer.getDisplayedQuestIndex();
        questRenderer.renderTaskTab(questStructurer.quests[displayedQuest].getTasks());
    }

    const addSampleQuests = () => {
        questStructurer.addQuest("Joining the Legion");

        questStructurer.addTask("Legate Rikke",
            "In order to prove myself to Legate Rikke, I am to clear out the bandits living at Fort Hraggstad.",
            "tomorrow Pepeg",
            "1",
            0
        );

        questStructurer.addQuest("The Jagged Crown");
        questStructurer.addQuest("Message to Whiterun");
    }

    return {
        initializeJournal
    }
})();

export { Journal }