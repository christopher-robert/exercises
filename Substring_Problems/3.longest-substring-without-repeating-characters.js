/**
 * @param {string} s
 * @return {number}
 */

 /*

Given a string, find the length of the longest substring without repeating characters.

Examples:

Given "abcabcbb", the answer is "abc", which the length is 3.

Given "bbbbb", the answer is "b", with the length of 1.

Given "pwwkew", the answer is "wke", with the length of 3. Note that the answer must be a substring, "pwke" is a subsequence and not a substring.

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

	debugger;

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

			if(map[str[slow]] === 2) {
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
