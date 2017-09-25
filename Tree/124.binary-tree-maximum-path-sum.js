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
	Remeber the value can be negative
 */
var maxPathSum = function(root) {
	if(!(root instanceof TreeNode)) {
		return 0;
	}

	let max = {
		value: -Infinity
	};

	recursion(root, max);

	return max.value;
};1

function recursion(root, max) {
	if(root === null) {
		return 0;
	}

	let leftMax;
	let rightMax;
	let subMax = root.val;

	max.value = Math.max(max.value, root.val);

	if(root.left !== null) {
		leftMax = recursion(root.left, max);

		max.value = Math.max(max.value, leftMax, leftMax + root.val);
		subMax = Math.max(subMax, leftMax + root.val);
	}

	if(root.right !== null) {
		rightMax = recursion(root.right, max);

		max.value = Math.max(max.value, rightMax, rightMax + root.val);
		subMax = Math.max(subMax, rightMax + root.val);
	} 
	
	if(root.left !== null & root.right !== null) {
		max.value = Math.max(max.value, leftMax + root.val + rightMax);
	}

	return subMax;
}
