/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

 /*
	Test cases:

	let left = {
		val: 3,
		left: null,
		right: null
	};

	let right = {
		val: 2,
		left: null,
		right: null
	};

	let root = {
		val: 100,
		left: left,
		right: right
	};

	let res = rob(root);

	console.log(res);
 */
 
var rob = function(root) {
	if(root === null) {
		return 0;
	}

	let maxValue = recursionHelper(root);

	return Math.max(maxValue.maxSelf, maxValue.maxNext);
};

function recursionHelper(root) {
	if(root === null) {
		return {
			maxSelf: 0,
			maxNext: 0
		};
	}

	let maxLeft = recursionHelper(root.left);
	let maxRight = recursionHelper(root.right);

	let maxValue = {
		maxSelf: root.val + maxLeft.maxNext + maxRight.maxNext,
		maxNext: Math.max(maxLeft.maxSelf, maxLeft.maxNext) + Math.max(maxRight.maxSelf, maxRight.maxNext)
	};

	return maxValue;
}
