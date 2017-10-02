function UnionFind(n) {
	let id = [];

	for(let i = 0; i < n; i++) {
		id[i] = i;
	}


	this.root = function(i) {
		while(i !== id[i]) {
			// path compression
			id[i] = id[id[i]];
			i = id[i];
		}

		return i;
	}

	this.find = function(p, q) {
		return this.root(p) === this.root(q);
	};

	this.union = function(p, q) {
		let i = this.root(p);
		let j = this.root(q);

		id[i] = j;
	};
}