/**
 * @param {character[][]} grid
 * @return {number}
 */

 /* Test cases

	console.log(numIslands2([
		"10111".split(''),
		"10101".split(''),
		"11101".split('')
	]));

 */

 /* DFS solution */
 var numIslands = function(grid) {
 	// check the type
 	if(!Array.isArray(grid) || grid.length === 0) {
 		return 0;
 	}

 	//
 	let count = 0;

 	for(let i = 0, xLen = grid.length; i < xLen; i++) {
 		for(let j = 0, jLen = grid[0].length; j < jLen; j++) {
 			if(grid[i][j] === '1') {
 				recursion(grid, i, j);
 				count++;
 			}
 		}
 	}

 	return count;
};

function recursion(grid, i, j) {
	if(i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === '0') return;

	grid[i][j] = '0';

	recursion(grid, i - 1, j);
	recursion(grid, i + 1, j );
	recursion(grid, i, j - 1);
	recursion(grid, i, j + 1);
}


/* Union Find Solution */
 function UnionFind(n) {
	this.ids = [];

	let xLen = n.length;
	let yLen = n[0].length;
	
	this.count = 0;

	for(let i = 0; i < xLen; i++) {
		for(let j = 0; j < yLen; j++) {
			if(n[i][j] === '1') {
				this.ids[i * yLen + j] = i * yLen + j;
				this.count++;
			}
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
			this.count--;
		}
	}
}

var numIslands2 = function(grid) {
	// check type
	if(!Array.isArray(grid) || grid.length === 0) {
 		return 0;
 	}

	// initalize the union
	let union = new UnionFind(grid);

	// start unioning
	let xLen = grid.length;
	let yLen = grid[0].length;

	for(let i = 0; i < xLen; i++) {
		for(let j = 0; j < yLen; j++) {
			if(grid[i][j] === '1') {
				let index = i * yLen + j;

				if(i >= 1 && grid[i - 1][j] === '1') {					
					union.union(index, (i - 1) * yLen + j);
				}

				if(i < xLen - 1 && grid[i + 1][j] === '1') {					
					union.union(index, (i + 1)* yLen + j);
				}

				if(j >= 1 && grid[i][j - 1] === '1') {					
					union.union(index, i * yLen + j - 1);
				}


				if(j < yLen - 1 && grid[i][j + 1] === '1') {					
					union.union(index, i * yLen + j + 1);
				}
			}
		}
	}

	return union.count;
};
