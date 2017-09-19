/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
	if(!Array.isArray(nums)) {
		throw new TypeError('nums must be an array');	
	}

	if(typeof target !== 'number') {
		throw new TypeError('target must be a number');
	}

	var hashMap = {};
	
	nums.forEach(function(num, index) {
		hashMap[num] = index;
	})
	
	for(var i = 0, len = nums.length; i < len; i++) {
		var remains = target - nums[i];
		
		if(hashMap[remains] !== undefined && hashMap[remains] !== i) {
			return [i, hashMap[remains]];
		}
	};

	return [];
};

var threeSum = function(nums, target) {
	if(!Array.isArray(nums)) {
		throw new TypeError('nums must be an array');	
	}

	if(typeof target !== 'number') {
		throw new TypeError('target must be a number');
	}

	var hashMap = {};
	
	nums.forEach(function(num, index) {
		hashMap[num] = index;
	});

	for(let i = 0, len = nums.length; i < len; i++) {
		let remains = target - nums[i];

		for(let j = 0; len - nums.length; j < len; j++) {
			if(j !== i) {
				let remains2 = remains - nums[j];

				if(hash[remains2] !== undefined && hash[remains2] !== j) {
					return [i, j, hash[remains2]]
				}
			}
		}
	}

	return [];
}

