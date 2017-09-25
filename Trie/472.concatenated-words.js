/**
 * @param {string[]} words
 * @return {string[]}
 */

var findAllConcatenatedWordsInADict = function(words) {
	if(!Array.isArray(words) || words.length === 0) {
		return [];
	}

	let res = [];
	let map = {};

	words.forEach(word => {
		if(typeof word === 'string' && word.length > 0) {
			map[word] = true;
		}
	});

	words.forEach(word => {
		if(typeof word === 'string' && word.length > 0) {
			map[word] = undefined;
			if(testWord(map, word)) {
				res.push(word);
			}
			map[word] = true;
		}
	})

	return res;
};


function testWord(map, word) {
	if(map[word] === true) {
		return true;
	}

	for(let len = word.length, i = len - 1; i >= 0; i--) {
		if(map[word.slice(0, i)] === true && testWord(map, word.slice(i))) {
			return true;
		}
	}

	return false;
}