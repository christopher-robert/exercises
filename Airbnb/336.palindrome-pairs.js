/**
 * @param {string[]} words
 * @return {number[][]}
 */

 /**

 	Basic Logic: get two sub strings of a word, s1, s2

 	There are two cases:

 	s1 + s2 (palindrome) + reversed_s1

 	reversed_s2 + s1 (palindrome) + s2

	Remember:
	
	(1) Build a hashmap with reversed words, then you don't have to reverse the substring everytime

	(2) You can use the word itself, remember to check the index is not equal

	(3) Empty string, need to add [index, empty_string_index], the other case [empty_string_index, index] will be coverd in the loop

	Test cases: 
	let res = palindromePairs(["abcd", "dcba", "lls", "s", "sssll"]);

	console.log(res);

	res = palindromePairs(["a","b","c","ab","ac","aa"]);

	console.log(res);

	res = palindromePairs(["a",""]);

	console.log(res);

 */

 var palindromePairs = function(words) {
	if(!Array.isArray(words)) {
		throw new TypeError('words has to be an array');
	}

	let hashMap = {};

	// reverse the word here
	words.forEach((word, index) => hashMap[reverseString(word)] = index);

	let res = [];

	words.forEach(function(word, index) {
		let l = word.length - 1;

		// if word is empty
		if(l < 0) {
			words.forEach(function(nWord, nIndex) {
				if(nIndex !== index && isPalindrome(nWord)) {
					// only add this one, because the other one will be covered below
					res.push([index, nIndex]);
				}
			});
		}

		while(l >= 0) {
			let sub1 = word.substring(0, l);
			let sub2 = word.substring(l);
			let index1 = hashMap[sub1];
			let index2 = hashMap[sub2];

			// the word cannot use itself
			if(typeof index1 === 'number' && index1 !== index && isPalindrome(sub2)) {
				res.push([index, hashMap[sub1]]);
			}

			if(typeof index2 === 'number' && index2 !== index && isPalindrome(sub1)) {
				res.push([hashMap[sub2], index]);
			}

			l--;
		}
	});
	
	return res;
};

function isPalindrome(word) {
	let left = 0;
	let right = word.length - 1;

	while(left < right) {
		if(word[left++] !== word[right--]) {
			return false;
		}
	}

	return true;
}

function reverseString(word) {
	let res = '';

	for(let i = word.length - 1; i >= 0; i--) {
		res += word[i];
	}

	return res;
}

//////////////////
var palindromePairsSlow = function(words) {
	if(!Array.isArray(words)) {
		throw new TypeError('words has to be an array');
	}

	let res = [];

	recursion(words, [], res);

	return res;
};

function recursion(words, currSol, res) {
	if(currSol.length > 2) {
		return;
	}

	if(currSol.length == 2) {
		let word = words[currSol[0]] + words[currSol[1]];
		
		if(isPalindrome(word)) {
			res.push([currSol[0], currSol[1]]);
		}

		return;
	}

	for(let i = 0, len = words.length; i < len; i++) {
		if(currSol.includes(i)) continue;

		currSol.push(i);
		recursion(words, currSol, res);
		currSol.splice(currSol.length - 1);
	}
}
