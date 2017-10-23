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

	let d = [];
	let len = nums.length;

	for(let i = 0; i < len; i++) {
		d[i] = 0;
	}

	d[0] = nums[0];
	d[1] = Math.max(nums[0], nums[1]);

	for(let i = 2; i < len; i++) {
		d[i] = Math.max(d[i - 1], d[i - 2] + nums[i]);
	}

	let res = [];

	let max = d[len - 1];

	for(let i = len - 1; i >= 2 && max > 0;) {
		if(d[i] === d[i - 2] + nums[i]) {
			res.unshift(i);
			max = max - nums[i];
			i = i - 2;
		} else {
			i = i - 1;
		}
	}

	if(max > 0) {
		if(max === nums[0]) {
			res.unshift(0);
		}

		if(max === nums[1]) {
			res.unshift(1);
		}
	}

	return {
		max: d[len - 1],
		houses: res
	}
}
