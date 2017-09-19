/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
	if(!Array.isArray(nums1) || !Array.isArray(nums2)) {
		return [];
	}

	let sortedOne = nums1.map(num => num).sort((a, b) => a - b);
	let sortedTwo = nums2.map(num => num).sort((a, b) => a - b);

	let i = 0;
	let lenOne = nums1.length;
	let j = 0;
	let lenTwo = nums2.length;
	let res = [];

	while(i < lenOne && j < lenTwo) {
		if(sortedOne[i] === sortedTwo[j]) {
			res.push(sortedOne[i]);
			i++;
			j++;
		} else if(sortedOne[i] < sortedTwo[j]) {
			i++;
		} else {
			j++
		};
	}

	return res;  
};