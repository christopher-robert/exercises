/*

	let buffer = new CirularBuffer(5);

	for(let i = 0; i < 5; i++) {
		buffer.add(i);
	}

	console.log(buffer.toString());

	console.log(buffer.get());

	console.log(buffer.toString());

	buffer.add('a');
	buffer.add('b');
	buffer.add('c');
	buffer.add('d');

	console.log(buffer.toString());

	buffer.add('(');
	buffer.add(')');
	buffer.add('*');
	buffer.add('&');
	buffer.add('^');

	console.log(buffer.toString());


	buffer.add('1');
	buffer.add('2');
	buffer.add('3');

	console.log(buffer.toString());

*/

/*

	There are two cases head === tail
	(1) empty
	(1) full, next add, we will need to overwrite head

	so we need another property to distingish these two case, 
	thus we add size

*/

function CirularBuffer(n) {
	if(typeof n !== 'number' || n <= 0) {
		return null;
	}

	let content = [];
	let head = 0;
	let tail = 0;
	let size = 0;

	this.add = function(item) {
		if(size === n) { // head == tail but size == n
			content[head] = item;
			head = ++head % n;
			tail = ++tail % n;
		} else {
			content[tail] = item;
			tail = ++tail % n;
			size++;
		}
	};

	this.get = function() {
		if(size === 0) { // head == tail but size == 0
			return null;
		}

		let res = content[head];
		
		head = ++head % n;

		size--;

		return res;
	};

	this.toString = function() {
		let res = [];

		for(let i = head, j = size; j > 0; i++, j--) {
			res.push(content[i % n] + '');
		};

		return res.join(',');
	}
}