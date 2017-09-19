/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    if(!Array.isArray(nums) || nums.length === 0) {
        return 0;
    }
    
    if(nums.length === 1) {
        return nums[0];
    }
    
    let len = nums.length;
    let max = 0;
    let d = [];
    
    // if you choose the first one
    d[0] = 0;
    d[1] = nums[0];
    d[2] = nums[0];
    
    for(let i = 3; i < len; i++) {
        d[i] = Math.max(d[i - 2] + nums[i - 1], d[i - 1]);
    }
    
    max = d[len - 1];
    
    // if you do not choose the first one, you can choose the last one
    d[0] = 0;
    d[1] = 0;
    d[2] = nums[1];
    
    for(let i = 3; i <= len; i++) {
        d[i] = Math.max(d[i - 2] + nums[i - 1], d[i - 1]);
    }
    
    return Math.max(max, d[len]);
};

/*
	You can also use two arrays to store two cases, but remember to treat the last one differently
*/