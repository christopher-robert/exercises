/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
	// check the input
	if(!Array.isArray(candidates)) {
		throw new TypeError('candidates has to be an array');
	}

	if(typeof target !== 'number') {
		throw new TypeError('target has to be a number');
	}

	// sort the candidates
	candidates.sort(function(a, b) {
		return a - b;
	})

	// start the recursion
	let res = [];
	let currSol = [];

	recursionHelper(candidates, target, 0, currSol, res);

	// return the res
	return res;
};

function recursionHelper(candidates, target, start, currSol, res) {
	if(target < 0) {
		return;
	}

	if(target === 0) {
		res.push(currSol.slice(0));
	}

	for(let i = start, len = candidates.length; i < len; i ++) {
		if(i !== start && candidates[i] == candidates[i - 1]) continue;

		currSol.push(candidates[i]);
		recursionHelper(candidates, target - candidates[i], i + 1, currSol, res);
		currSol.splice(currSol.length - 1);
	}
}
