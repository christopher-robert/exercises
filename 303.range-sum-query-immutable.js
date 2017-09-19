/**
 * @param {number[]} nums
 */

function NumArray(nums) {
	if(!Array.isArray(nums)) {
		throw new TypeError('nums need to be an array');
	}

	for(var i = 1, len = nums.length; i < len; i++) {
		nums[i] = nums[i] + nums[i - 1]; 
	}

	this.nums = nums;
};

/** 
 * @param {number} i 
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function(i, j) {
	var len = this.nums.length;

	if (i < 0 || i > len - 1 || j < 0 || j > len - 1 || i > j) {
		throw new Error('param is out of range');
	}

	if(i == 0) {
		return this.nums[j];
	} else {
		return this.nums[j] - this.nums[i - 1];
	}
};

/** 
 * Your NumArray object will be instantiated and called as such:
 * var obj = Object.create(NumArray).createNew(nums)
 * var param_1 = obj.sumRange(i,j)
 */