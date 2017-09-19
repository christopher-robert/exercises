/*
Given a list of words and two words word1 and word2, return the shortest distance between these two words in the list.

word1 and word2 may be the same and they represent two individual words in the list.

For example,
Assume that words = ["practice", "makes", "perfect", "coding", "makes"].

Given word1 = “makes”, word2 = “coding”, return 1.
Given word1 = "makes", word2 = "makes", return 3.
*/

function shortestWordDistance(words, word1, word2) {
	if(!Array.isArray(words) || words.length === 0) {
		return -1;
	}

	let index1 = -1;
	let index2 = -1;

	let shortest = Infinity;

	if(word1 === word2) {
		words.forEach((word, index)=> {
			if(word === word1) {
				if(index1 === -1 && index2 === -1) {
					index2 = index;
				} else {
					index1 = index2;
					index2 = index;
				}
			}

			if(index1 !== -1 && index2 !== -1) {
				shortest = Math.min(shortest, Math.abs(index1 - index2));
			}
		});
	} else {
		words.forEach((word, index)=> {
			if (word === word1) {
				index1 = index;
			} else if (word === word2) {
				index2 = index;
			}

			if(index1 !== -1 && index2 !== -1) {
				shortest = Math.min(shortest, Math.abs(index1 - index2));
			}
		});
	}

	return shortest === Infinity ? -1 : shortest;
}
