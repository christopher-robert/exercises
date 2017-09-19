/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
	if(!Array.isArray(nums) || nums.length <= 0) {
		return null;
	}

	return recursionHelper(nums, 0, nums.length - 1);
};

function recursionHelper(nums, left, right) {
	if(left > right) {
		return null
	}

	let middle = Math.floor((left + right) / 2);

	let root = new TreeNode(nums[middle]);

	root.left = recursionHelper(nums, left, middle - 1);
	root.right = recursionHelper(nums, middle + 1, right);

	return root;
}