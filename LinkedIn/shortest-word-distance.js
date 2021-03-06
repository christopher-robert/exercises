 /*
Given a list of words and two words word1 and word2, return the shortest distance between these two words in the list.
For example, Assume that words = ["practice", "makes", "perfect", "coding", "makes"].
Given word1 = "coding", word2 = "practice", return 3. Given word1 = "makes", word2 = "coding", return 1.
*/

function shortestWordDistance(words, word1, word2) {
	if(!Array.isArray(words) || words.length === 0) {
		return -1;
	}

	let index1 = -1;
	let index2 = -1;

	let shortest = Infinity;

	words.forEach((word, index)=> {
		if (word === word1) {
			index1 = index;
		}

		if (word === word2) {
			index2 = index;
		}

		if(index1 !== -1 && index2 !== -1) {
			shortest = Math.min(shortest, Math.abs(index1 - index2));
		}

	});

	return shortest === Infinity ? -1 : shortest;
}