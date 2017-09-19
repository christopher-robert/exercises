/**
 * @param {number[]} heights
 * @return {number}
 */

 /*
	Test cases:

	//console.log(largestRectangleArea([2,1,5,6,2,3]));
	//console.log(largestRectangleArea([4,2,0,3,2,5]));
	console.log(largestRectangleArea([0]));

 */
var largestRectangleArea = function(heights) {
	if(!Array.isArray(heights) || heights.length === 0) {
		return 0;
	}

	let stack = [];
	let max = 0;

	for(let i = 0, len = heights.length; i <= len; i++) {
		let h = i === len ? 0 : heights[i];

		if(stack.length === 0 || h >= heights[stack[stack.length - 1]]) {
			stack.push(i);
		} else {
			let top = stack.pop();

			max = Math.max(max, heights[top] * (stack.length === 0 ? i : (i - 1 - stack[stack.length - 1])));

			i--;
		}
	}

	return max;
};
