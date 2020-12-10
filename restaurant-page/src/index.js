import { menuTab } from './menu/menuTab.js';
import { homeTab } from './home/homeTab.js';

const index = (() => {
    let tabs = document.querySelector(".tabs");
    let content = document.querySelector("#content");
    console.log("test");

    const initializeTabs = () => {
        menuTab.initializeTab();
        homeTab.initializeTab();

        tabs.appendChild(homeTab.makeTabButton(content, "Home"));
        tabs.appendChild(menuTab.makeTabButton(content, "Menu"));

        content.appendChild(menuTab.getTab());
    }

    return {
        initializeTabs
    }
})();

index.initializeTabs();