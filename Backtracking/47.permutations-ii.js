/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUniqueInPlace = function(nums) {
	// check the input
	if(!Array.isArray(nums)) {
		throw new TypeError('nums has to be an array');
	}
	// sort to avoid the duplicates
	nums.sort(function(a, b) {
		return a - b;
	});
	
	// declaration
	let res = [];

	// recursion
	recursionHelper(0, nums, res);

	// return the result
	return res;
};

function recursionHelper(start, nums, res) {
	if(start === nums.length) {
		res.push(nums.slice(0));
		return;
	}

	for(let i = start, len = nums.length; i < len; i++) {
		if(noswap(nums, start, i)) continue;

		swap(nums, start, i);
		recursionHelper(start + 1, nums, res);
		swap(nums, i, start);
	}
}

function noswap(nums, start, i) {
	for(let j = start; j < i; j++) {
		if(nums[j] === nums[i]) {
			return true;
		}
	}

	return false;
}

function swap(nums, a, b) {
	let temp = nums[a];

	nums[a] = nums[b];
	nums[b] = temp;
}


var permuteUnique = function(nums) {
	// check the input
	if(!Array.isArray(nums)) {
		throw new TypeError('nums has to be an array');
	}
	// sort to avoid the duplicates
	nums.sort(function(a, b) {
		return a - b;
	});
	
	// declaration
	let res = [];

	// recursion
	recursionHelper2(nums, [], res, nums.map(() => false));

	// return the result
	return res;
};

function recursionHelper2(nums, currSol, res, used) {
	if(currSol.length === nums.length) {
		res.push(currSol.slice(0));
		return;
	}

	for(let i = 0, len = nums.length; i < len; i++) {
		if(used[i] === true || i > 0 && nums[i] === nums[i - 1] && used[i - 1] === false) continue;

		currSol.push(nums[i]);
		used[i] = true;
		recursionHelper2(nums, currSol, res, used);
		currSol.splice(currSol.length - 1);
		used[i] = false;
	}
}
