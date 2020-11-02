function removeAtElement (array, target) {
    let arrayLength = array.length;
    for(let i = 0; i < arrayLength; i+=0) {
        if(array[i] === target) {
            console.log("removing!");
            array.splice(i, 1);
        } else {
            console.log(array[i]);
            i++;
        }
    }
    console.log("remove successful!");
    return array;
}

function removeString (array, target) {
    let arrayLength = array.length;
    for(let i = 0; i < arrayLength; i+=0) {
        if(array[i] === target) {
            array.splice(i, 1);
        } else {
            i++;
        }
    }
    return array;
}

function individualRemove(array, target) {
    console.log("individualRemove started...")
    if (target != null) {
        if (typeof target === "string") {
            removeString(array, target);
        } else {
            console.log("removing at element...");
            removeAtElement(array, target);
        }
    }
    return array;
}

const removeFromArray = function(array, target1, target2=null, target3=null, target4=null) {
    console.log(array);
    array = individualRemove(array, target1);
    array = individualRemove(array, target2);
    array = individualRemove(array, target3);
    array = individualRemove(array, target4);
    console.log(array);
    return array;
}

module.exports = removeFromArray
