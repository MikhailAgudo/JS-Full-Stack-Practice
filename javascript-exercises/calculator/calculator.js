function add (input1, input2) {
	return input1 + input2;
}

function subtract (input1, input2) {
	return input1 - input2;
}

function sum (numArray) {
	let sum = 0;
	for (let i = 0; i < numArray.length; i++) {
		sum += numArray[i];
	}
	return sum;
}

function multiply (numArray) {
	let result = 1;
	for (let i = 0; i < numArray.length; i++) {
		result *= numArray[i];
	}
	return result;
}

function power(input, power) {
	let result = input;
	for (let i = 1; i < power; i++) {
		result *= input;
	}
	return result;
}

function factorial(input) {
	if (input === 0) {
		return 1;
	} else {
		let result = 1;
		for (let i = 0; i < input; i++) {
			result *= (i + 1);
		}
		return result;
	}
}

module.exports = {
	add,
	subtract,
	sum,
	multiply,
    power,
	factorial
}