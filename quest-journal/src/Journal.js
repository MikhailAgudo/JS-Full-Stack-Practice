import { questStructurer } from './quest/questStructurer.js';
import { questRenderer } from './ui/questRenderer.js';
import { unitTest } from './unitTest.js';
import { uiInterfacer } from './ui/uiInterfacer.js';
import { Loader } from './storage-handler/Loader.js';

const Journal = (() => {
    const initializeJournal = () => {
        questRenderer.initializeJournal();
        Loader.load();
    }

    const addSampleQuests = () => {
        questStructurer.addQuest("Joining the Legion");

        questStructurer.addTask(
            "In order to prove myself to Legate Rikke, I am to clear out the bandits living at Fort Hraggstad.",
            1
        );

        questStructurer.addTask(
            "Report to Legate Rikke.",
            1
        );

        questStructurer.addQuest("The Jagged Crown");
        questStructurer.addQuest("Message to Whiterun");
    }

    return {
        initializeJournal
    }
})();

export { Journal }