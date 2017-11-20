/**
 * @param {number[]} nums
 * @return {number}
 */

 /*

Find the contiguous subarray within an array (containing at least one number) which has the largest product.



For example, given the array [2,3,-2,4],
the contiguous subarray [2,3] has the largest product = 6.

 */

 /*

public int maxProduct(int[] A) {
        if (A == null || A.length == 0) {
            return 0;
        }
        int max = A[0], min = A[0], result = A[0];
        for (int i = 1; i < A.length; i++) {
            int temp = max;
            max = Math.max(Math.max(max * A[i], min * A[i]), A[i]);
            min = Math.min(Math.min(temp * A[i], min * A[i]), A[i]);
            if (max > result) {
                result = max;
            }
        }
        return result;
    }

 */
var maxProduct = function(nums) {
	if(!Array.isArray(nums) || nums.length === 0) {
		return 0;
	}

	if(nums.length === 1) {
		return nums[0];
	}
    
    // find how many negative values
    let negatives = 0;

    for(let i = 0, len = nums.length; i < len; i++) {
    	if(nums[i] < 0) {
    		negatives++;
    	}
    }

    let left = 0;
    let right = nums.length - 1;
    let counter = negatives;

    while(counter % 2 !== 0) {
    	if(nums[left] < 0) {
    		counter--;
    	}

    	left++;
    }

    let leftValue = 1;

    while(left <= right) {
    	leftValue = leftValue * nums[left++];
    }

    counter = negatives;

    while(counter % 2 !== 0) {
    	if(nums[right] < 0) {
    		counter--;
    	}

    	right--;
    }

    let rigthValue = 1;
    left = 0;

    while(left <= right) {
    	rigthValue =  rigthValue * nums[right--];
    }

    return Math.max(leftValue, rigthValue);
};
