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
    }

    const addSampleQuests = () => {
        questStructurer.addQuest("Joining the Legion");
        questStructurer.addQuest("The Jagged Crown");
        questStructurer.addQuest("Message to Whiterun");
    }

    return {
        initializeJournal
    }
})();

export { Journal }