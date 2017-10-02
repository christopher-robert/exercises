/*

Total price = base price + service fee + cleaning fee + ...

input : array of decimals ~ X
output : array of int ~ Y

But they need to satisfy the condition:

sum(Y) = round(sum(x))
minmize (|y1-x1| + |y2-x2| + ... + |yn-xn|)
Example1:
input = 30.3, 2.4, 3.5
output = 30 2 4

Example2:
input = 30.9, 2.4, 3.9
output = 31 2 4

*/

/*
	Test cases:

	console.log(roundedNum([30.3, 2.4, 3.5]));
	console.log(roundedNum([30.9, 2.4, 3.9]));
	console.log(roundedNum([1.1, 1.2, 1.3]));
	console.log(roundedNum([1.9, 1.8, 1.7]));

*/

/*
	We first need to guarantee sum(Y) = round(sum(x))

	Floor every num and find the difference to round of sum

	the diff is the number of items we need to adjust to achieve round(sum(x))

	we greedily select the min distance between nums[i] am nums[i] + 1

	because we apply +1, this minimize the impact to overall distance
*/

function roundedNum(nums) {
	if(!Array.isArray(nums) || nums.length === 0) {
		return nums;
	}

	let floored = nums.map(num => Math.floor(num));
	let flooredSum = floored.reduce((pre, curr) => pre + curr, 0);
	let sum = nums.reduce((pre, curr) => pre + curr, 0);
	let diff = Math.round(sum - flooredSum);

	let toReduce = nums.map((num, index) => {
		return {
			index,
			diff: 1 - (num - floored[index])
		};
	});

	toReduce.sort((a, b) => a.diff - b.diff);

	while(diff > 0) {
		floored[toReduce.shift().index] += 1;

		diff--;
	}

	return floored;
}
