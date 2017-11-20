/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
	if(!Array.isArray(nums) || nums.length === 0) {
		return null;
	}

	let max = nums[0];
	let sum = 0;
	let i = 0;

	for(let i = 0, len = nums.length; i < len; i++) {
		sum = sum + nums[i];
		max = Math.max(max, sum);
		sum = Math.max(0, sum);
	}

	return max;
};


var maxSubArray2 = function(nums) {
	if(!Array.isArray(nums) || nums.length === 0) {
		return null;
	}

	let max = nums[0];
	let sum = 0;
	let j = 0;
	let len = nums.length;

	while(j < len) {
		sum = sum + nums[j];

		if(sum >= max) {
			max = sum;
		}

		if(sum < 0) {
			sum = 0;
		}

		j++;
	}

	return max;
};