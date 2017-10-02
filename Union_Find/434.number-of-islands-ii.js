/**
 * @param {character[][]} grid
 * @return {number}
 */

 /* Test cases:

	let grid = new Grid([
		"00000".split(''),
		"00000".split(''),
		"00000".split('')
	]);

	console.log(grid.addLand(0, 0));
	console.log(grid.addLand(0, 1));
	console.log(grid.addLand(2, 4));
*/

 

 function UnionFind(n) {
	this.ids = [];

	let xLen = n.length;
	let yLen = n[0].length;

	for(let i = 0; i < xLen; i++) {
		for(let j = 0; j < yLen; j++) {
			this.ids[i * yLen + j] = undefined;
		}
	}

	this.root = function(i) {
		while(this.ids[i] !== i) {
			i = this.ids[i];
		}

		return i;
	};

	this.find = function(p, q) {
		return this.root(p) === this.root(q);
	}

	this.union = function(p, q) {
		let a = this.root(p);
		let b = this.root(q);

		if(a !== b) {
			this.ids[a] = b;
		}
	}
}

function Grid(grid) {
	// check type
	if(!Array.isArray(grid) || grid.length === 0) {
 		return null;
 	}

	// initalize the union
	let union = new UnionFind(grid);

	let xLen = grid.length;
	let yLen = grid[0].length;
	let count = 0;

	this.addLand = function(i, j)  {
		if(i < 0 || i >= xLen || j < 0 || j >= yLen) {
			return;
		}

		grid[i][j] = '1';

		// start unioning
		let isolated = true;
		let index = i * yLen + j;

		if(i >= 1 && grid[i - 1][j] === '1') {					
			union.union(index, (i - 1) * yLen + j);
			isolated = false;
		}

		if(i < xLen - 1 && grid[i + 1][j] === '1') {					
			union.union(index, (i + 1)* yLen + j);
			isolated = false;
		}

		if(j >= 1 && grid[i][j - 1] === '1') {					
			union.union(index, i * yLen + j - 1);
			isolated = false;
		}

		if(j < yLen - 1 && grid[i][j + 1] === '1') {					
			union.union(index, i * yLen + j + 1);
			isolated = false;
		}

		if(isolated) {
			count++;
		}

		return count;
	}
};
