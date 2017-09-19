/*
Given a nested list of integers, return the sum of all integers in the list weighted by their depth.

Each element is either an integer, or a list -- whose elements may also be integers or other lists.

Different from the previous question where weight is increasing from root to leaf, now the weight is defined from bottom up. i.e., the leaf level integers have weight 1, and the root level integers have the largest weight.

Example 1:
Given the list [[1,1],2,[1,1]], return 8. (four 1's at depth 1, one 2 at depth 2)

Example 2:
Given the list [1,[4,[6]]], return 17. (one 1 at depth 3, one 4 at depth 2, and one 6 at depth 1; 1*3 + 4*2 + 6*1 = 17) */

function weightSum2(list) {
	if(!Array.isArray(list) || list.length === 0) {
		return 0;
	}

	let queue = [];
	let levelSum = [];
	let levelCount = 1;

	queue.push(list);

	while(queue.length !== 0) {
		let nextCount = 0;
		let currSum = 0;

		for(let i = 0; i < levelCount; i++) {
			let curr = queue.shift();

			if(typeof curr === 'number') {
				currSum += curr;
			}

			if(Array.isArray(curr)) {
				curr.forEach(item => {
					queue.push(item);
					nextCount++;
				});
			}
		}

		levelCount = nextCount;
		levelSum.push(currSum);
	}

	let len = levelSum.length;

	return levelSum.reduce(function(sum, item) {
		return sum + item * len--;
	}, 0);
}

function weightSum2Better(list) {
	if(!Array.isArray(list) || list.length === 0) {
		return 0;
	}

	let queue = [];
	let sum = 0;
	let unweightedSum = 0;
	let levelCount = 1;

	queue.push(list);

	while(queue.length !== 0) {
		let nextCount = 0;
		
		for(let i = 0; i < levelCount; i++) {
			let curr = queue.shift();

			if(typeof curr === 'number') {
				unweightedSum += curr;
			}

			if(Array.isArray(curr)) {
				curr.forEach(item => {
					queue.push(item);
					nextCount++;
				});
			}
		}

		levelCount = nextCount;
		sum = sum + unweightedSum;
	}

	return sum;
}
