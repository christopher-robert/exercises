/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */

 /* Test cases
	console.log(minWindow("ADOBECEBAC", "ABC"));
	console.log(minWindow("ADOBECODEBANC", "ABCF"));
	console.log(minWindow("BAAANC", "AA"));
	console.log(minWindow("A", "A"));
	console.log(minWindow("AB", "A"));
	console.log(minWindow("ABBAFFFADA", "AA"));
	console.log(minWindow("bdab", "ab"));
	console.log(minWindow("ab", "a"));
 */

var minWindow = function(str, target) {
	if(typeof str !== 'string' || str.length === 0 || typeof target !== 'string' || target.length === 0) {
		return '';
	}
  
	let map = {};
	let counter = target.length; // check whether the substring is valid
	let sLen = str.length;
	let slow = 0, fast = 0; //two pointers, one point to tail and one  head
	let head = 0;
	let minLength = Infinity;

	let allChars = target.split('');

	allChars.forEach(c => {
		if(map[c] === undefined) {
			map[c] = 1;
		} else {
			map[c]++;
		}
	});

	while(fast < sLen){
		if(map[str[fast]] !== undefined) {
			if(map[str[fast]] > 0) { 
				counter--;
			}
			map[str[fast]]--;
		}
		fast++;

		while(counter === 0){ 
			if(fast - slow < minLength) { // fast is not included (because it is the next one)
				minLength = fast - slow;
				head = slow;
			}
			
			if(map[str[slow]] !== undefined) {
				if(map[str[slow]] >= 0) {
					counter++;
				}
				map[str[slow]]++;
			}
			slow++;
		}
	}

	return minLength === Infinity ? '' : str.slice(head, head + minLength);
}
