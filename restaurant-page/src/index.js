import { menuTab } from './menu/menuTab.js';

const index = (() => {
    let tabs = document.querySelector(".tabs");

    const initializeTabs = () => {
        menuTab.initializeTab();

        tabs.appendChild(menuTab);
    }
})();

index.initializeTabs();