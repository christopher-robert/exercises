
/* Find kth smallest */

/*

Worst-case performance: О(n^2)
Best-case performance: О(n)
Average performance: O(n)

*/

function select(nums, k) {
	if(!Array.isArray(nums) || nums.length <= 0 || k <= 0 || k > nums.length) {
		return null;
	}

	return _select(nums, 0, nums.length - 1, k - 1)
}

function _select(nums, low, high, k) {
	if(low === high) {
		return nums[low];
	}

	let pivot = partition(nums, low, high);

	if(pivot !== k) {
		if(pivot > k) {
			return _select(nums, low, pivot - 1, k);
		} else {
			return _select(nums, pivot + 1, high, k);
		}
	}

	return nums[pivot];
}

function partition(nums, low, high) {
	let i = low;

	for(let j = low; j < high; j++) {
		if(nums[j] <= nums[high]) {
			if(i !== j) {
				// swap i an j
				swap(nums, i, j);
			}

			i++;
		}
	}

	// swap i and high
	swap(nums, i, high);

	return i;
}

function swap(arr, i, j) {
	let temp = arr[i];

	arr[i] = arr[j];
	arr[j] = temp;
}