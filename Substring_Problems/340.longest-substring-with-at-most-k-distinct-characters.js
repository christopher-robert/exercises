/** Extension of Longest Substring with At Most Two Distinct Characters /
/**
 * @param {string} s
 * @return {number}
 */
 /*
	console.log(lengthOfLongestSubstringWithK("a", 1));
	console.log(lengthOfLongestSubstringWithK("ab", 1));
	console.log(lengthOfLongestSubstringWithK("abcabcbb", 4));
	console.log(lengthOfLongestSubstringWithK("aaaaaa", 0));
	console.log(lengthOfLongestSubstringWithK("pwwkew", 3));
 */
var lengthOfLongestSubstring = function(str, k) {
	if(typeof str !== 'string' || str.length === 0 || k <= 0) {
		return 0;
	}

	let map = {};
	let slow = 0;
	let fast = 0;
	let sLen = str.length;
	let counter = 0;
	let maxLength = -Infinity;


	while(fast < sLen) {
		if(map[str[fast]]) {
			map[str[fast]]++;
		} else {
			map[str[fast]] = 1;
			counter++;
		}

		fast++;

		while(counter > k) {
			maxLength = Math.max(maxLength, fast - slow - 1);

			if(map[str[slow]]) {
				if(map[str[slow]] === 1) {
					counter--;
				}

				map[str[slow]]--;
			}
			slow++;
		}

	}

	maxLength = Math.max(maxLength, fast - slow);

	return maxLength;
};

