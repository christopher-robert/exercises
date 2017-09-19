/*
	Test cases:

	console.log(union([1, 2], [2]));
	console.log(union([1, 2], [2, 3]));
	console.log(union([1, 2, 4, 5], [3, 9]));
	console.log(union([1, 2 ,5], [1, 2, 6, 7]));
*/

function union(nums1, nums2) {
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
		if(sortedOne[i] < sortedTwo[j]) {
			res.push(sortedOne[i]);
			i++;
		} else if(sortedOne[i] === sortedTwo[j]){
			res.push(sortedOne[i]);
			i++;
			j++;
		} else {
			res.push(sortedTwo[j]);
			j++;
		}
	}

	while(i < lenOne) {
		res.push(sortedOne[i++]);
	}

	while(j < lenTwo) {
		res.push(sortedTwo[j++]);
	}

	return res;
}