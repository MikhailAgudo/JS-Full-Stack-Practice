const Structurer = (() => {
    const appendChildren = (container, elements) => {
        let newElement = elements.shift();
        container.appendChild(newElement);

        if (elements.length === 0) {
            return container;
        } else {
            appendChildren(container, elements);
        }
    }

    const addClasses = (element, classes) => {
        let newClass = classes.shift();
        element.classList.add(newClass);

        if( classes.length === 0) {
            return element;
        } else {
            addClasses(element, classes);
        }
    }

    return {
        appendChildren,
        addClasses
    }
})();

export { Structurer }