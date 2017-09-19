/*
There are a row of n houses, each house can be painted with one of the three colors: red, blue or green. 
The cost of painting each house with a certain color is different. 
You have to paint all the houses such that no two adjacent houses have the same color.

The cost of painting each house with a certain color is represented by a n x 3 cost matrix. 
For example, costs[0][0] is the cost of painting house 0 with color red; 
costs[1][2] is the cost of painting house 1 with color green, and so on... 
Find the minimum cost to paint all houses.
Note: All costs are positive integers.
*/

function paintHouse(costs) {
	if(!Array.isArray(costs) || costs.length === 0) {
		return 0;
	}

	let d = [[],[],[]];
	let len = costs.length;

	d[0][0] = costs[0][0];
	d[0][1] = costs[0][1];
	d[0][2] = costs[0][2];

	for(let i = 1; i < len; i++) {
		d[i][0] = Math.min(d[i - 1][1], d[i - 1][2]) + costs[i][0];
		d[i][1] = Math.min(d[i - 1][0], d[i - 1][2]) + costs[i][1];
		d[i][2] = Math.min(d[i - 1][0], d[i - 1][1]) + costs[i][2];
	}

	return Math.min(d[len - 1][0], d[len - 1][1], d[len - 1][2]);
}
