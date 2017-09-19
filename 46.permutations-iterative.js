/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
	if(!Array.isArray(nums) || nums.length <= 0) {
		throw new TypeError('nums must be an array');
	}

	let res = [[nums[0]]];

	for(let i = 1, len = nums.length; i < len; i++) {
		let newRes = [];

		res.forEach(function(solution, index) {
			for(let j = 0; j < i + 1; j++) {
				let newSol = solution.slice();
				
				newSol.splice(j, 0, nums[i]);
				newRes.push(newSol);
			}
		});

		res = newRes;
	}

	return res;
}
