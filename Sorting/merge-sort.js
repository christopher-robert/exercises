/*
	Basic Idea: divide and conquer

	Average Case: O(nlogn)

	Worst Case: O(nlogn)

	Stable Sorting

	Merge sort's most common implementation does not sort in place;
	therefore, the memory size of the input must be allocated for the sorted output to be stored in
*/

function mergeSort(nums) {
	if(!Array.isArray(nums) || nums.length === 0) {
		return;
	}

	let helper = [];
	let helperMinLen = Math.floor(nums.length / 2) + 1;

	helper[helperMinLen - 1] = null;

	_mergeSort(nums, 0, nums.length - 1, helper);

	return nums;
}


function _mergeSort(nums, left, right, helper) {
	if(left >= right) {
		return;
	}

	let middle = left + Math.floor((right - left) / 2);
	let leftLen = middle - left + 1;

	_mergeSort(nums, left, middle, helper);
	_mergeSort(nums, middle + 1, right, helper);

	copyArray(nums, helper, left, leftLen);

	let i = 0;
	let j = middle + 1;
	let k = left;

	while(k <= right && i < leftLen) {
		nums[k++] = (j > right || helper[i] <= nums[j]) ? helper[i++] : nums[j++];
	}
}

function copyArray(source, target, from, len) {
	for(let i = 0, j = from; i < len; ) {
		target[i++] = source[j++];
	}
}