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
        let questTitles = questRenderer.getQuestTitles();

        questRenderer.renderQuestTab(questTitles);

        let displayedQuest = questRenderer.getDisplayedQuestIndex();
        questRenderer.renderTaskTab(questRenderer.getTasks());
    }

    const addSampleQuests = () => {
        questStructurer.addQuest("Joining the Legion");

        questStructurer.addTask(
            "In order to prove myself to Legate Rikke, I am to clear out the bandits living at Fort Hraggstad.",
            0
        );

        questStructurer.addTask(
            "Report to Legate Rikke.",
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