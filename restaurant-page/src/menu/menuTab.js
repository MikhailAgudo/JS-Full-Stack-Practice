import { menuCard } from './menuCard.js';

const menuTab = (() => {
    let tab = document.createElement("div");

    const initializeTab = () => {
        tab.className = "menuTab";

        menuCard("", "Temerian Rye", 
            "5000 orens", tab).makeCard();

        menuCard("", "Mahakaman Mead", 
            "500 orens", tab).makeCard();
    }

    const makeTabButton = (content, text) => {
        let newButton = document.createElement("button");
        newButton.textContent = text;

        newButton.addEventListener("click", () => {
            content.innerHTML = "";
            content.appendChild(tab);
        });

        return newButton;
    }

    const getTab = () => {
        return tab;
    }

    return {
        initializeTab,
        makeTabButton,
        getTab
    }
})();

export { menuTab }