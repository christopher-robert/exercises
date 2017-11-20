/**
 * @param {number[]} nums
 * @return {number}
 */

 /*

Given an array nums containing n + 1 integers where each integer is between 1 and n (inclusive),
prove that at least one duplicate number must exist.
Assume that there is only one duplicate number, find the duplicate one.



Note:

You must not modify the array (assume the array is read only).
You must use only constant, O(1) extra space.
Your runtime complexity should be less than O(n2).
There is only one duplicate number in the array, but it could be repeated more than once.

 */

 /* Binary Search Solution */
 /* Based on Pigeon Hole Theory */
var findDuplicate = function(nums) {
	if(!Array.isArray(nums) || nums.length <= 1) {
		return null;
	}

	// nums
	let len = nums.length;
    let left = 1;
    let right = len;

    while(left < right) {
    	let middle = Math.floor((left + right) / 2);
 		let count = 0;

 		for(let i = 0; i < len; i++) {
 			if(nums[i] <= middle) {
 				count++;
 			}
 		}

 		if(count > middle) {
 			right = middle;
 		} else {
 			left = middle + 1;
 		}
    }

    return left;
};

/*  */