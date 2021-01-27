const uiInterfacer = (() => {
    const transformToUIReadable = (input, output, lastIndex, mode) => {
        //let questTitles = []
        if (lastIndex === -1) {
            return output;
        } else {
            switch (mode) {
                case "title":
                    output.unshift(input[lastIndex].getTitle());
                    break;
                case "description":
                    output.unshift(input[lastIndex].getDescription());
                    break;
                case "date":
                    output.unshift(input[lastIndex].getDueDate());
                    break;
            }
            lastIndex = lastIndex - 1;
            return transformToUIReadable(input, output, lastIndex, mode);
        }
    }

    // add method to calculate indexes for questRenderer
    const questsToTitles = (quests) => {
        let questTitles = [];
        for (let i = 0; i < quests.length; i++) {
            let newTitle = quests[i].getTitle();
            questTitles.push(newTitle);
        }

        return questTitles;
    }

    return {
        transformToUIReadable,
        questsToTitles
    }
})();

export {
    uiInterfacer
}