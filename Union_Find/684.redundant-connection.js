/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function(edges) {
	let ids = {};

	function root(i) {
		while(i !== ids[i]) {
			ids[i] = ids[ids[i]];
			i = ids[i];
		}

		return i;
	}

	for(let i = 0, len = edges.length; i < len; i++) {
		let edge = edges[i];

		if(ids[edge[0]] === undefined) {
			ids[edge[0]] = edge[0];
		}

		if(ids[edge[1]] === undefined) {
			ids[edge[1]] = edge[1];
		}

		let a = root(edge[0]);
		let b = root(edge[1]);

		if(a === b){
			return edge;
		} else {
			ids[a] = b;
		}
	};

	return null;
};