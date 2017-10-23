/*

[-1, 0, 1, -1, 5, 10, -5]

shuffle the array, so even index number is smaller than odd index number
*/

/*
	test cases:

	console.log(shuffle([-1, 0, 1, -1, 5, 10, -5]));

	console.log(shuffle([1, 0, 2, -1]));

	console.log(shuffle([1, 0, 2, -1, -10]));

*/


function shuffle(nums) {
	if(!Array.isArray(nums) || nums.length <= 0) {
		return nums;
	}

	// find the median number 
	let median = nums.length % 2 ? Math.ceil(nums.length / 2) : nums.length / 2;
	
	select(nums, 0, nums.length - 1, median);

	// reassign the array
	let res = [];

	for(let i = 0, j = median; i < median; i++, j++) {
		res.push(nums[i]);

		if(j < nums.length) {
			res.push(nums[j]);
		}
	}

	return res;
}

function select(nums, low, high, k) {
	if(low === high) {
		return low;
	}

	let pivot = partition(nums, low, high);

	if(pivot !== k) {
		if(pivot > k) {
			return select(nums, low, pivot - 1, k);
		} else {
			return select(nums, pivot + 1, high, k);
		}
	}

	return pivot;
}

function partition(nums, low, high) {
	let i = low;

	for(let j = low; j < high; j++) {
		if(nums[j] <= nums[high]) {
			if(i !== j) {
				swap(nums, i, j);
			}
			i++;
		}
	}

	swap(nums, i, high);

	return i;
}

function swap(arr, i, j) {
	let temp = arr[i];

	arr[i] = arr[j];
	arr[j] = temp;
}
