/*
	Basic Idea: divide and conquer

	Average Case: O(nlogn)

	Worst Case: O(n^2)
*/

function quickSort(nums) {
	if(!Array.isArray(nums) || nums.length === 0) {
		return nums;
	}

	_quicksort(nums, 0, nums.length - 1);

	return nums;
}

function _quicksort(nums, low, high) {
	if (low >= high) {
		return;
	}

	let p = partition(nums, low, high);

	_quicksort(nums, low, p - 1);
	_quicksort(nums, p + 1, high);
}

function partition(nums, low, high) {
	let i = low;

	for(let j = low; j < high; j++) {
		if(nums[j] <= nums[high]) {
			//swap nums[i] nums[j]
			if(i !== j) {
				let temp = nums[i];

				nums[i] = nums[j];
				nums[j] = temp;
			}
			i++;
		}
	}
	// put pivot(the high) into the right position
	let temp = nums[i];
	nums[i] = nums[high];
	nums[high] = temp;

	return i;
}
