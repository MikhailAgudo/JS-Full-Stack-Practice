const fibonacci = function(position) {
    if (position < 1) {
        return "OOPS";
    }

    let sum = 0;
    let sequence = [0, 1];

    for (let i = 1; i < position; i++) {
        sequence.push(sequence[1] + sequence.shift());
        //sum += sequence.shift();
        //sequence.push(sum);
        console.log(sequence[1]);
    }
    return sequence[1];
}

module.exports = fibonacci