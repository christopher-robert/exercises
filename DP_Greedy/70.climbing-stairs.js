/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
	if (typeof n !== 'number') {
		throw new TypeError('n has to be a number');
	}

	var steps = [];

	steps[0] = 1;
	steps[1] = 1;

	for(var i = 2; i <= n; i++) {
		steps[i] = steps[i - 1] + steps[i - 2];
	}

	return steps[n];
};