/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(str) {
	if(typeof str !== 'string' || str.length === 0) {
		return 0;
	}

	let map = {};
	let slow = 0;
	let fast = 0;
	let duplicate = false;
	let maxLength = -Infinity;
	let sLen = str.length;

	while(fast < sLen) {
		if(map[str[fast]]) {
			map[str[fast]]++;
			duplicate = true;
		} else {
			map[str[fast]] = 1;
		}

		fast++;

		while(duplicate) {
			maxLength = Math.max(maxLength, fast - slow - 1);

			if(map[str[slow]] == 2) {
				map[str[slow]]--;
				duplicate = false;
			} else {
				map[str[slow]] = 0;
			}
			slow++;
		}

	}

	maxLength = Math.max(maxLength, fast - slow);

	return maxLength;
};
