/* Test cases:
	let itertor = new VectorItertor([[], [1, 2], [],[3, 4], [5, 6], []]);

	while(itertor.hasNext()) {
		console.log(itertor.next());
	}

	console.log('------');

	itertor = new VectorItertor([[], [1, 2], [],[3, 4], [5, 6]]);

	while(itertor.hasNext()) {
		let val = itertor.next();

		console.log(val);

		if(val === 3) {
			itertor.remove(1);
		}
	}
	
	console.log('------');
	
	itertor = new VectorItertor([[], [1, 2], [],[3, 4], [5, 6]]);

	while(itertor.hasNext()) {
		let val = itertor.next();

		console.log(val);

		if(val === 2) {
			itertor.remove(3);
		}
	}

	console.log('------');

	itertor = new VectorItertor([[], [1, 2], [],[3, 4], [5, 6]]);

	while(itertor.hasNext()) {
		let val = itertor.next();

		console.log(val);

		if(val === 3) {
			itertor.remove(3);
		}
	}

*/

function VectorItertor(vector) {
	if(!Array.isArray(vector)) {
		throw new TypeError('vector has to be an array');
	}

	this.vector = vector;

	let x = 0;
	let y = 0;

	this.hasNext = function() {
		let xLen = this.vector.length;

		while(x < xLen && y === this.vector[x].length) {
			x++;
			y = 0;
		}

		return x < xLen;
	};

	this.next = function() {
		return vector[x][y++];
	}

	this.remove = function(row) {
		if(row < 0 || row >= this.vector.length) {
			return false;
		}

		for(let i = row, len = this.vector.length - 1; i < len; i++) {
			this.vector[i] = this.vector[i + 1];
		}

		this.vector.pop();

		if (x === row){
			y = 0;
		} else if(x > row) {
			x--;
		}

		return true;
	}
}
