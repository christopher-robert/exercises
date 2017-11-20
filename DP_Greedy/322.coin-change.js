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
		dp[i] = i % coins[0] === 0 ? i / coins[0] : Infinity;
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


var coinChange2 = function(coins, amount) {
	//check params
	if(!Array.isArray(coins)) {
		throw new TypeError('coins must be an array');
	}

	if(typeof amount !== 'number') {
		throw new TypeError('amount must be a number');
	}

	//initilization
	let d = [];

	for(let i = 0, len = coins.length; i < len; i++) {
		d[i] = [0];
	}

	for(let j = 1; j <= amount; j++) {
		d[0][j] = j % coins[0] === 0 ? j / coins[0] : Infinity;
	}

	// dp
	for(let i = 1, len = coins.length; i < len; i++) {
		for(let j = 0; j <= amount; j++) {
			if(j < coins[i]) {
				d[i][j] = d[i - 1][j];
			} else {
				d[i][j] = Math.min(d[i - 1][j], d[i][j - coins[i]] + 1);
			}
		}
	}

	//the result
	return d[coins.length - 1][amount] === Infinity ? - 1 : d[coins.length - 1][amount];    
};
