/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 // In place
var permuteInPlace = function(nums) {
	// check input
	if(!Array.isArray(nums) || nums.length <= 0) {
		throw new TypeError('nums must be an array with more than one item');
	}

	let res = [];

	recursion(nums, 0, res);

	return res;
};


function recursion(nums, start, res) {
	if(start === nums.length) {
		// copy the current array to save the result
		res.push(nums.slice());
	}

	for(let i = start, len = nums.length; i < len; i++) {
		swap(nums, start, i);
		recursion(nums, start + 1, res);
		// recover the array
		swap(nums, i, start);
	}
}

function swap(nums, a, b) {
	let temp = nums[a];

	nums[a] = nums[b];
	nums[b] = temp;
}

// not in place
var permute = function(nums) {
	if(!Array.isArray(nums) || nums.length <= 0) {
		throw new TypeError('nums must an array with more than one item');
	}

	let res = [];

	recursionHelper(nums, [], res);

	return res;
}

function recursionHelper(nums, currSol, res) {
	if(currSol.length === nums.length) {
		res.push(currSol.slice(0));
		return;
	}

	for(let i = 0, len = nums.length; i < len; i++) {
		if(currSol.includes(nums[i])) continue;

		currSol.push(nums[i]);
		recursionHelper(nums, currSol, res);
		currSol.splice(currSol.length - 1);
	}
} 
