import _ from 'lodash';

function component() {
    const element = document.createElement("div");

    // Lodash, currently included via a script, is
    // required for this line to work.
    // UPDATE: Lodash is now imported by this script
    // at line 1.
    element.innerHTML = _.join(["Hello", "webpack"], " ");

    return element;
}

document.body.appendChild(component());