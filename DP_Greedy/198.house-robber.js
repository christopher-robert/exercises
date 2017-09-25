/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
	if(!Array.isArray(nums)) {
		throw new TypeError('nums must be an array');
	}

	let len = nums.length;

	if(len <= 0) {
		return 0;
	}

	if(len === 1) {
		return nums[0];
	}

	let d = [];

	// initalize the result array
	d[0]= nums[0];
	d[1] = Math.max(nums[0], nums[1]);

	// dp
	for(let i = 2; i < len; i++) {
		d[i] = Math.max(d[i - 2] + nums[i], d[i - 1]);
	}

	return d[len - 1];
};