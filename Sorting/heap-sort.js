


/*
	Although somewhat slower in practice on most machines than a well-implemented quicksort, 
	it has the advantage of a more favorable worst-case O(n log n) runtime. 
	Heapsort is an in-place algorithm, but it is not a stable sort.

	Worst-case performance	{ O(n\log n)} O(n\log n)
	Best-case performance	{\ O(n)} O(n)
	Average performance	{\displaystyle O(n\log n)} O(n\log n)
*/

/*
	Building a heap alone would be O(n)
*/

/*
	This is the shiftdown version
*/

function heapSort(nums) {
	if(!Array.isArray(nums) || nums.length === 0) {
		return nums;
	}

	let n = nums.length;

	// build the max heap
	for(let i = Math.floor((n - 1) / 2  - 1); i >= 0; i--) {
		heapify(nums, n, i);
	}

	for(let i = n - 1; i >= 0; i--) {
		// swap the top of the heap and the last one
		let temp = nums[i];
		nums[i] = nums[0];
		nums[0] = temp;

		// heap is smaller and shiftdown the top
		heapify(nums, i, 0);
	}

	return nums;
}

function heapify(nums, n, i) {
	let largest = i;
	let left = 2 * i + 1;
	let right = 2 * i + 2;

	if(left < n && nums[left] > nums[largest]) {
		largest = left;
	}

	if(right < n && nums[right] > nums[largest]) {
		largest = right;
	}

	if(largest !== i) {
		//swap
		let temp = nums[largest];
		nums[largest] = nums[i];
		nums[i] = temp;

		heapify(nums, n, largest);
	}
}