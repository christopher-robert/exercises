/*
This is a follow up of Shortest Word Distance. 
The only difference is now you are given the list of words and your method will be called repeatedly many times with different parameters. 
How would you optimize it?

Design a class which receives a list of words in the constructor, and implements a method that takes two words word1 and word2 and return the shortest distance between these two words in the list.
For example,
Assume that words = ["practice", "makes", "perfect", "coding", "makes"].
Given word1 = "coding”, word2 = "practice”, return 3. Given word1 = "makes", word2 = "coding", return 1.*/


function ShortestWordDistance(words) {
	this.words = words;

	let wordMap = {};

	words.forEach((word, index) => {
		if (!wordMap[word]) {
			wordMap[word] = [];
		}

		wordMap[word].push(index);
	});

	this.wordMap = wordMap;

	this.getShortestDistance = function(word1, word2) {
		let index1 = this.wordMap[word1];
		let index2 = this.wordMap[word2];

		if(index1 === undefined || index2 === undefined) {
			return -1;
		}

		let i = 0;
		let j = 0;
		let len1 = index1.length;
		let len2 = index2.length;
		let shortest = Infinity;

		while(i < len1 && j < len2) {
			shortest = Math.min(shortest, Math.abs(index1[i] - index2[j]));

			if (index1[i] < index2[j]) {
				i++;
			} else {
				j++;
			}
		}

		return shortest === Infinity ? -1 : shortest;
	}
}
