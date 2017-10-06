/*

	console.log(rob([8, 1, 1, 100, 1, 1, 200]));
	console.log(rob([8, 100, 1]));
	console.log(rob([100, 8, 1]));
	console.log(rob([8]));
	console.log(rob([8, 100]));

*/

function rob(nums) {
	if(!Array.isArray(nums) || nums.length === 0) {
		return 0;
	}

	if(nums.length === 1) {
		return {
			value: nums[0],
			houses: [0]
		};
	}

	if(nums.length === 2) {
		return {
			value: Math.max(nums[0], nums[1]),
			houses: [Number(nums[0] < nums[1])]
		};
	}

	let d = [];
	let len = nums.length;

	d[0] = nums[0];
	d[1] = Math.max(nums[0], nums[1]);

	for(let i = 2; i < len; i++) {
		d[i] = Math.max(d[i - 2] + nums[i], d[i - 1]);
	}

	let max = d[nums.length - 1];
	let houses = [];
	let i = len - 1

	while(max > 0) {
		if(max === nums[i]) {
			houses.push(i);
			max -= nums[i];
		} else if(i >= 2 && max === d[i - 2] + nums[i]){
			houses.push(i);
			max -= nums[i];
			i -= 2;
		} else if(i >= 1 && max === d[i - 1]){
			i--;
		}
	}

	return {
		value: d[nums.length - 1],
		houses: houses
	}
}
