/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} t
 * @return {boolean}
 */
var containsNearbyAlmostDuplicate = function(nums, k, t) {
    if (!Array.isArray(nums) || nums.length === 0 || k <= 0 || t < 0) {
        return false;
    }
    
    for(let i = 0, len = nums.length ; i < len; i++) {
        for(let j = i + 1; j < len && j <= i + k; j++) {
            if (Math.abs(nums[i] - nums[j]) <= t) {
                return true;
            }
        }
    }
    
    return false;
};