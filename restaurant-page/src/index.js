import { menuTab } from './menu/menuTab.js';

const index = (() => {
    let tabs = document.querySelector(".tabs");
    let content = document.querySelector("#content");
    console.log("test");

    const initializeTabs = () => {
        menuTab.initializeTab();

        tabs.appendChild(menuTab.makeTabButton(content, "Menu"));
        content.appendChild(menuTab.getTab());
    }

    return {
        initializeTabs
    }
})();

index.initializeTabs();