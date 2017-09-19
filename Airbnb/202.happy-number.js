/**
 * @param {number} n
 * @return {boolean}
 */

 /*
 Wiki: 
 A happy number is a number defined by the following process: 
 Starting with any positive integer, replace the number by the sum of the squares of its digits, and repeat the process until the number either equals 1 (where it will stay), 
 or it loops endlessly in a cycle that does not include 1. Those numbers for which this process ends in 1 are happy numbers, while those that do not end in 1 are unhappy numbers (or sad numbers)
 */

 function processNum(num) {
	let sum = 0;

	while(num > 0) {
		let val = num % 10;

		sum = sum + val * val;
		num = Math.floor(num / 10);
	}

	return sum;
 }

var isHappy = function(n) {
	if(typeof n !== 'number' || n <= 0) {
		return false;
	}

	let slow = n;
	let fast = n;

	do {
		slow = processNum(slow);
		fast = processNum(fast);
		fast = processNum(fast);
	} while(slow !== fast)

	return slow === 1;
};