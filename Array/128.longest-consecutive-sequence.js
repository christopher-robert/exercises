/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
	if(!Array.isArray(nums) || nums.length === 0) {
		return 0;
	}

	let hashMap = {};

	nums.forEach(num => {
		hashMap[num] = true;
	});


	let max = 0;

	nums.forEach(num => {
		if(hashMap[num]) {
			let left = num - 1;

			while(hashMap[left]) {
				hashMap[left] = false;
				left--;
			}

			let right = num + 1;

			while(hashMap[right]) {
				hashMap[right] = false;
				right++;
			}

			max = Math.max(max, right - left - 1);
		}
	});

	return max;
};