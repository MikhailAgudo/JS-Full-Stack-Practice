const homeTab = (() => {
    let tab = document.createElement("div");

    const initializeTab = () => {
        tab.className = "homeTab";
        tab.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet pretium sem. Nunc et ornare ante. Morbi molestie mauris vitae leo vestibulum, in aliquet libero pretium. Donec ultrices velit at urna condimentum, sed egestas diam porta. Proin eget enim lectus. Curabitur pellentesque quis metus ut malesuada. Vivamus quis est nisi. Nam luctus, nulla sit amet condimentum mollis, risus est fringilla massa, eu cursus augue nibh venenatis ex. Ut quis egestas libero. Cras nibh nibh, interdum ornare risus nec, molestie lacinia felis. Morbi molestie tortor ac tellus consectetur viverra. In pretium ac nibh fringilla condimentum. Suspendisse potenti. Morbi finibus, nisi ut imperdiet congue, orci massa hendrerit tortor, id tristique augue quam iaculis elit. Morbi pulvinar ligula id odio bibendum convallis."
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

export { homeTab }