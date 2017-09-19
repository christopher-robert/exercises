/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */


 // 1, 2, 9, 4, 8, 7, 6, 5
var nextPermutation = function(nums) {
	// check the input
	if (!Array.isArray(nums)) {
		throw new TypeError('nums should be an array');
	}

	//
	let len = nums.length; 
	let k = -1;


	for(let i = k + 1; i < len - 1; i++) {
		if(nums[i] < nums[i + 1]) {
			k = i;	
		}
	}

	if(k === -1) {
		nums.sort(function(a, b) {
			return a - b;
		});

		return;
	}

	// the last step guarantees all the rest will be in descending order
	// nums[j] > nums[k] and get the one with biggest index
	let j = k + 1;

	while(j < len && nums[j] > nums[k]) {
		j++;
	};

	j--;

	swap(nums, k, j);

	// reverse the k + 1 to the end
	for(let left = k + 1, right = nums.length - 1; left < right;) {
		swap(nums, left++, right--);
	}
};

function swap(nums, i, j) {
	let temp = nums[i];

	nums[i] = nums[j];
	nums[j] = temp;
}
