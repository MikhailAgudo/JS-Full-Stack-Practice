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

    return {
        transformToUIReadable
    }
})();

export {
    uiInterfacer
}