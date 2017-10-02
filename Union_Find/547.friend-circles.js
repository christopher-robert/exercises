/**
 * @param {number[][]} M
 * @return {number}
 */

 /* Test cases: 
		console.log(findCircleNum([
			[1,1,0],
			[1,1,0],
			[0,0,1]]
		));

 */

 function UnionFind(n) {
 	if(n <= 0) {
 		return null;
 	}

 	let ids = [];

 	for(let i = 0; i < n; i++) {
 		ids[i] = i;
 	}

 	this.count = n;

 	this.root = function(i) {
 		while(i !== ids[i]) {
 			ids[i] = ids[ids[i]];
 			i = ids[i];
 		}

 		return i;
 	}

 	this.find = function(i, j) {
 		return this.root(i) === this.root(j);
 	}

 	this.union= function(i, j) {
 		let a = this.root(i);
 		let b = this.root(j);

 		if(a !== b) {
 			ids[a] = b;
 			this.count--;
 		}
 	}
 }

var findCircleNum = function(M) {
	if(!Array.isArray(M) || M.length === 0) {
		return 0;
	}

	let union = new UnionFind(M.length);

	for(let i = 0, len = M.length; i < len; i++) {
		for(j = 0; j < len; j++) {
			if(M[i][j] === 1 && i !== j) {
				union.union(i, j);
			}
		}
	}

	return union.count;
};
