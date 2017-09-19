/**
 * @param {number} n
 * @return {boolean}
 */

 /*
	//console.log(largestRectangleArea([2,1,5,6,2,3]));
	//console.log(largestRectangleArea([4,2,0,3,2,5]));
	console.log(isHappy(2));
 */
var isHappy = function(n) {
	if(typeof n !== 'number' || n <= 0) {
		return false;
	}

	let num = n;

	while(num < Number.MAX_VALUE) {
		let sum = 0;

		while(num > 0) {
			let val = num % 10;

			sum = sum + val * val;
			num = Math.floor(num / 10);
		}

		if(sum === 1) {
			return true;
		}

		num = sum;
	}

	return false;
};