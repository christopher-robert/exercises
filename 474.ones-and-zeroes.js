/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function(strs, m, n) {
	// check input
	if (!Array.isArray(strs)) {
		throw new TypeError("strs must be an array");
	}

	if(m < 0 || n < 0) {
		throw new Error('m and n must be bigger than zero');
	}

	// inital dp array
	let dp = [];

	for(let i = 0; i <= m; i++) {
		dp[i] = [];
		for(let j = 0; j <= n; j++) {
			dp[i][j] = 0;
		}
	}

	for(let i = 0, len = strs.length; i < len; i++) {
		// calculate the cost of strs
		let cost = calculateCost(strs[i]);

		if(cost === Infinity) {
			break;
		}

		let zero = cost.zero;
		let one = cost.one;

		// dp
		for(let x = m; x >= zero; x--) {
			for(let y = n; y >= one; y--) {
				dp[x][y] = Math.max(dp[x][y], dp[x - zero][y - one] + 1);		
			}
		}
	}

	return dp[m][n];
};

function calculateCost(str) {
	let cost = {
		zero: 0,
		one: 0
	};

	for(let i = 0, sLen = str.length; i < sLen; i++) {
		if(str[i] === '0') {
			cost.zero++;
		} else if(str[i] === '1') {
			cost.one++;
		} else {
			// string contains other char
			cost = Infinity;
			break;
		}
	}

	return cost;
}
