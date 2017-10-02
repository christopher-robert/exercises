/** Test case 
	console.log(getNumberOfComponents2(5, [[1, 2], [3, 2], [1, 3], [3, 4]]));
**/

/* Ajacent List Solution */
function getNumberOfComponents(n, edges) {
	// check type

	//build adjacent list
	let nodes = {};

	for(let i = 0; i < n; i++) {
		nodes[i] = {
			neighbors: [],
			visited: false
		};
	}

	edges.forEach(function(edge) {
		nodes[edge[0]].neighbors.push(edge[1]);
		nodes[edge[1]].neighbors.push(edge[0]);
	});

	// scan
	let res = 0;

	for(let i = 0; i < n; i++) {
		if(nodes[i].visited) {
			continue;
		}

		res++;

		let children = [i];

		while(children.length !== 0) {
			let node = children.shift();

			if(!nodes[node].visited) {
				nodes[node].visited = true;
				nodes[node].neighbors.forEach(function(neighbor) {
					if(!nodes[neighbor].visited) {
						children.push(neighbor)
					}
				});
			}
		}
	}

	return res;
}

/* Union Find Solution */

function UnionFind(n) {
	let ids = [];

	this.count = 0;

	for(let i = 0; i < n; i++) {
		ids[i] = i;
		this.count++;
	}

	this.root = function(i) {
		while(ids[i] !== i) {
			i = ids[i];
		}

		return i;
	};

	this.find = function(p, q) {
		return this.root(p) === this.root(q);
	}

	this.union = function(p, q) {
		let a = this.root(p);
		let b = this.root(q);

		if(ids[a] !== b) {
			ids[a] = b;
			this.count--;
		}
	}
}

function getNumberOfComponents2(n, edges) {
	// check type

	// build the union
	let union = new UnionFind(n);

	edges.forEach(function(edge) {
		union.union(edge[0], edge[1]);
	});

	return union.count;

	// // loop the n and find every root and push it to a set

	// let set = new Set();

	// for(let i = 0; i < n; i++) {
	// 	set.add(union.root(i));
	// }

	// // return the size of the set

	// return set.size;
}
