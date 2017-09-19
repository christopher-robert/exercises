/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
	// check params
	if(!Array.isArray(prices)) {
		throw new TypeError('prices has to an array');
	}

	if(prices.length < 2) {
		return 0;
	}

	let len = prices.length;
	let temp = [0, 0, 0];


	for(let i = 1; i < len; i++) {
		for(let j = 0; j < 3; j++) {
			temp[j] = prices[i];
		}

		d[i][0] = Math.max(d[i-1][0] - )

	}



	// initalization

    
};