let findTheOldest = function(people) {
    let CURRENT_YEAR = 2020;
    let oldestIndex = 0;
    let oldestAge = 0;
    for (let i = 0; i < people.length; i++) {
        if (people[i].yearOfDeath === undefined) {
            let age = CURRENT_YEAR - people[i].yearOfBirth;
            if (age > oldestAge) {
                oldestAge = age;
                oldestIndex = i;
            }
        } else {
            let age = people[i].yearOfDeath - people[i].yearOfBirth;
            if (age > oldestAge) {
                oldestAge = age;
                oldestIndex = i;
            }
        }
    }

    return people[oldestIndex];
}

module.exports = findTheOldest
