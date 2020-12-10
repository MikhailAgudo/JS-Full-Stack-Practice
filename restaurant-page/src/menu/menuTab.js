import { menucard } from './menuCard.js';

const menuTab = (() => {
    let tab = document.createElement("div");

    const initializeTab = () => {
        tab.className = "menuTab";
        tab.id = "content";

        tab.appendChild(menuCard("", "Temerian Rye", 
            "5000 orens", tab).makeCard());
    }

    const makeTabButton = (content, text) => {
        let newButton = document.createElement("button");
        newButton.textContent = text;

        newButton.addEventListener("click", () => {
            content.innerHTML = "";
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