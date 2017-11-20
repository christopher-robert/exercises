/**
 * @param {number[]} height
 * @return {number}
 */

var maxArea = function(height) {
	if(!Array.isArray(height) || height.length <= 1) {
		return 0;
	}

	let left = 0;
	let right = height.length - 1;
	let max = -Infinity;

	while(left < right) {
		max = Math.max(max, Math.min(height[left], height[right]) * (right - left));

		if(height[left] < height[right]) {
			left++;
		} else {
			right--;
		}
	}
    
    return max;
};
