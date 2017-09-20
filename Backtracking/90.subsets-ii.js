/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
	if(!Array.isArray(nums)) {
		throw new TypeError('nums must be an array');
	}

	nums.sort(function(a, b) {
		return a - b;
	});

	let res = [];

	recursionHelper(nums, 0, [], res);

	return res;
};

function recursionHelper(nums, startIndex, currSol, res) {
	res.push(currSol.slice(0));

	for(let i = startIndex, len = nums.length; i < len; i++) {
		if(i > startIndex && nums[i] === nums[i - 1]) continue;

		currSol.push(nums[i]);

		recursionHelper(nums, i + 1, currSol, res);

		currSol.splice(currSol.length - 1);
	}
}