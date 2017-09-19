/*
There are a row of n houses, each house can be painted with one of the k colors. 
The cost of painting each house with a certain color is different. 
You have to paint all the houses such that no two adjacent houses have the same color.
The cost of painting each house with a certain color is represented by a n x k cost matrix. 

For example, costs[0][0] is the cost of painting house 0 with color 0; 
costs[1][2]is the cost of painting house 1 with color 2, and so on... 
Find the minimum cost to paint all houses.
Note: All costs are positive integers.
Follow up: Could you solve it in O(nk) runtime?

Test cases: 

			let res = paintHouseK([
				[1,2,3],
				[2,5,6],
				[6,1,1]]);

			console.log(res);

			res = paintHouseK([
				[1,2,1,4],
				[2,5,6,1],
				[5,1,2,7]]);

			console.log(res);
*/

function paintHouseK(costs) {
	if(!Array.isArray(costs) || costs.length === 0) {
		return 0;
	}

	let index1 = -1;
	let min1 = 0;
	let min2 = 0;

	for(let i = 0, n = costs.length; i < n; i++) {
		let newIndex1 = -1;
		let newMin = Infinity;
		let newMin2 = Infinity;

		for(let j = 0, k = costs[0].length; j < k; j++) {
			let currCost = j !== index1 ? min1 + costs[i][j] : min2 + costs[i][j];

			if(newMin > currCost) {
				newMin2 = newMin;
				newMin = currCost;
				newIndex1 = j;
			} else if(newMin2 > currCost) {
				newMin2 = currCost;
			}
		}

		index1 = newIndex1;
		min1 = newMin;
		min2 = newMin2;
	}

	return min1;
}

