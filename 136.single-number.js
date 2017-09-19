/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
	return nums.reduce((accum, num) => accum ^ num, 0);
};
