

function buildHeap(arr) {
	// 2 * i + 2 <= arr.length - 1
	for(let i = Math.floor(arr.length / 2 - 1); i >= 0; i--) {
		heapify(arr, i);
	}
}

function heapify(arr, i) {
	let largest = i;
	let left = 2 * i + 1;
	let right = 2 * i + 2;
	let len = arr.length;

	if(left < len && arr[largest] < arr[left]) {
		largest = left;
	}

	if(right < len && arr[largest] < arr[right]) {
		largest = right;
	}

	// swap the value
	if(largest !== i) {
		let temp = arr[largest];

		arr[largest] = arr[i];
		arr[i] = temp;

		heapify(arr, largest);
	}
}


/* 76. Min Window */
function minWindow(str, target) {
	if(typeof str !== 'string' || typeof target !== 'string' || str.length < target.length) {
		return '';
	}

	let map = {};

	for(let i = 0, len = target.length; i < len; i++) {
		if(map[target[i]] === undefined) {
			map[target[i]] = 1;
		} else {
			map[target[i]]++;
		}
	}

	let fast = 0;
	let slow = 0;
	let counter = target.length;
	let sLen = str.length;

	let minWindow = Infinity;
	let head = null;

	while(fast < sLen) {
		if(map[str[fast]] !== undefined) {
			if(map[str[fast]] > 0) {
				counter--;
			}
			
			map[str[fast]]--; // when map[...] is negative, it is the duplicate ones
		}

		fast++;

		while(counter === 0) {
			if(map[str[slow]] !== undefined) {
				if(map[str[slow]] >= 0) {
					counter++;
				}

				map[str[slow]]++;
			}

			if(fast - slow < minWindow) {
				minWindow = fast - slow;
				head = slow;
			}

			slow++;
		}
	}

	return minWindow === Infinity ? '' : str.slice(head, head + minWindow);
}

/* 3 */

 function lengthOfLongestSubstring(str) {
 	if(typeof str !== 'string' || str.length === 0) {
 		return '';
 	}

 	let map = {};
 	let fast = 0;
 	let slow = 0;
 	let sLen = str.length;
 	let head = null;
 	let maxLength = -Infinity;
 	let duplicate = false;

 	while(fast < sLen) {
 		if(map[str[fast]]) {
 			map[str[fast]]++;
 			duplicate = true;
 		} else {
 			map[str[fast]] = 1;
 		}

 		fast++;

		while(duplicate) {
			if(fast - slow - 1 > maxLength) {
				maxLength = fast - slow - 1;
				head = slow;
			}

			if(map[str[slow]] === 2) {
				duplicate = false;
			}

			map[str[slow]]--;
			slow++;
		}
 	}

 	if(fast - slow > maxLength) {
 		maxLength = fast - slow;
 		head = slow;
 	}

 	return maxLength;
 }

 /* 340 */
 function lengthOfLongestSubstringWithK(str, k) {
 	if(typeof str !== 'string' || k < 0) {
 		return 0;
 	}

 	let fast = 0;
 	let slow = 0;
 	let sLen = str.length;
 	let map = {};
 	let counter = k;
 	let maxLength = -Infinity;
 	let head = null;

 	while(fast < sLen) {
 		if(map[str[fast]]) {
 			map[str[fast]]++;
 		} else {
 			map[str[fast]] = 1;
 			counter--;
 		}

 		fast++;

 		while(counter < 0) {
 			if(fast - slow - 1 > maxLength) {
 				maxLength = fast - slow - 1;
 				head = slow;
 			}

 			if(map[str[slow]]) {
 				map[str[slow]]--;

 				if(map[str[slow]] === 0) {
 					counter++;
 				}
 			}

 			slow++;
 		}
 	}

 	if(fast - slow > maxLength) {
 		maxLength = fast - slow;
 		head = slow;
 	}

 	return maxLength;
 }


function heapify(arr, size, i) {
	let largest = i;

	let left = 2 * i + 1;
	let right = 2 * i + 2;

	if(left < size && arr[left] > arr[largest]) {
		largest = left;
	}

	if(right < size && arr[right] > arr[largest]) {
		largest = right;
	}

	if(largest !== i) {
		// swap largest and i
		let temp = arr[largest];
		arr[largest] = arr[i];
		arr[i] = arr[largest];

		heapify(arr, largest);
	}
}

function heapSort(arr) {
	for(let i = Math.floor((arr.length - 1) / 2 - 1); i >= 0; i--) {
		heapify(arr, i);
	}

	for(let i = arr.length - 1; i >= 0; i--) {
		let temp = arr[i];
		arr[i] = arr[0];
		arr[0] = temp;

		heapify(arr, i, 0);
	}
}

function select(arr, k) {
	return recursionHelper(arr, 0, arr.length - 1, k - 1);
}

function recursionHelper(arr, left, right, k) {
	if(left === right) {
		return arr[left];
	}

	let p = partition(arr, left, right);

	if(p === k) {
		return arr[k];
	}

	if(p !== k) {
		return recursionHelper(arr, left, p - 1, k);
	} else {
		return recursionHelper(arr, p + 1, right, k);
	}
}

function partition(arr, left, right) {
	let i = left; 

	for(let j = left; j < right; j++) {
		if(arr[i] <= arr[high]) {
			if(i !== j) {
				swap(arr, i , j);
			}

			i++;
		}
	}

	swap(arr, i, right);

	return i;
}

function swap(arr, i, j) {
	let temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp;
}

