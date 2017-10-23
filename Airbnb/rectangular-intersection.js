
/*

	console.log(getOverlappingRects([[[0,0],[2,2]],[[1,1],[3,3]],[[1,0],[3,4]]])); // 1
	console.log(getOverlappingRects([[[0,0],[2,2]],[[1,1],[3,3]],[[4,4],[6,6]],[[5,5],[7,7]]])); //2

*/

function getOverlappingRects(rects) {
	if(!Array.isArray(rects) || rects.length <= 1) {
		return 0;
	}

	let len = rects.length;
	let union = new UnionFind(len);


	for(let i = 0; i < len; i++) {
		for(let j = i + 1; j < len; j++) {
			if(isIntersect(rects[i], rects[j])) {
				union.union(i, j);
			}
		}
	}

	return union.count;
}

function isIntersect(a, b) {
	return !(b[1][0] < a[0][0] || b[0][0] > a[1][0] || b[0][1] > a[1][1] || b[1][1] < a[0][1]);
}

function UnionFind(n) {
	this.count = n;
	this.arr = [];

	for(let i = 0; i < n; i++) {
		this.arr[i] = i;
	}

	this.root = function(i) {
		while(i !== this.arr[i]) {
			this.arr[i] = this.arr[this.arr[i]];
			i = this.arr[i];
		}

		return i;
	}

	this.union = function(i, j) {
		let a = this.root(i);
		let b = this.root(j);

		if(a !== b) {
			this.arr[a] = b;
			this.count--;
		}
	}
}
