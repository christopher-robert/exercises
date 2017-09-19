/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
	//check params
	if(!Array.isArray(coins)) {
		throw new TypeError('coins must be an array');
	}

	if(typeof amount !== 'number') {
		throw new TypeError('amount must be a number');
	}

	//initilization
	let dp = [];

	dp[0] = 0;

	// you have to fill the exact amount
	for(let i = 1; i <= amount; i++) {
		dp[i] = Infinity;
	}

	// dp
	for(let i = 0, len = coins.length; i < len; i++) {
		for(let j = coins[i]; j <= amount; j++) {
			dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1);
		}
	}

	//the result
	return dp[amount] === Infinity ? -1 : dp[amount];    
};