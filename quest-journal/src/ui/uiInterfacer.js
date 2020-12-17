const uiInterfacer = (() => {
    const questsToTitleArray = (quests, questTitles, lastIndex) => {
        //let questTitles = []
        if (lastIndex === -1) {
            return questTitles;
        } else {
            questTitles.unshift(quests[lastIndex].getTitle());
            lastIndex = lastIndex - 1;
            return questsToTitleArray(quests, questTitles, lastIndex);
        }
    }
    return {
        questsToTitleArray
    }
})();

export {
    uiInterfacer
}