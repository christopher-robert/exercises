/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
	// check params
	if(!Array.isArray(prices)) {
		throw new TypeError('prices must be an array');
	}

	if(prices.length < 2) {
		return 0;
	}

	// initialization
	let len = prices.length;
	let maxProfit = 0;
	let sellIndex = len - 1;

	// the loop
	for (i = len - 2; i >= 0; i--) {
		if(prices[sellIndex] - prices[i] > maxProfit) {
			maxProfit = prices[sellIndex] - prices[i];
		}

		if(prices[i] > prices[sellIndex]) {
			sellIndex = i;
		}
	}

	// the return
	return maxProfit;
};