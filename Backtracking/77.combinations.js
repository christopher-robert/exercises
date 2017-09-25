/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
	if (typeof n !== 'number' || typeof k !== 'number') {
		throw new TypeError('n and k need to be a number');
	}

	if(n < 0 || k < 0) {
		throw new TypeError('n and k cannot be negative');
	}

	let res = [], currSol = [];

	recursionHelper(n, k, 1, currSol, res);

	return res;
};

function recursionHelper(n, k, start, currSol, res) {
	if (k === 0) {
		res.push(currSol.slice(0));
	}

	for(let i = start; i <= n; i++) {
		currSol.push(i);
		recursionHelper(n, k - 1, i + 1, currSol, res);
		currSol.splice(currSol.length - 1);
	}
}