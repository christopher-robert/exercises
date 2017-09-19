

/*

ticketsInfo: [
	['SFO', 'LAX', 120],
	['LAX', 'YWC', 400]
]

Test cases: 
			let res = getBestRoute([
				['A', 'B', 1],
				['A', 'C', 1],
				['B', 'D', 2],
				['C', 'D', 3]], 'A', 'D', 2);

			console.log(res);

			let res = getBestRoute([
				['A', 'B', 1],
				['A', 'C', 1],
				['B', 'D', 4],
				['C', 'D', 3],
				['A', 'E', 1],
				['E', 'F', 1],
				['F', 'D', 1]], 'A', 'D', 1);

			console.log(res);

*/

function getBestRoute(ticketInfo, from, to, k) {
	// build the graph
	let vertices = {};

	ticketInfo.forEach(function(entry) {
		let startNode = vertices[entry[0]];

		if(startNode === undefined) {
			startNode = {
				name: entry[0],
				edges: [],
				_weigth: Infinity
			};

			vertices[entry[0]] = startNode;
		}

		let endNode = vertices[entry[1]];

		if(endNode === undefined) {
			endNode = {
				name: entry[1],
				edges: [],
				_weigth: Infinity
			};

			vertices[entry[1]] = endNode;
		}

		let edge = {
			start: startNode,
			end: endNode,
			cost: entry[2]
		};

		startNode.edges.push(edge);
	});

	// topogoical order to get minimal path
	let departure = vertices[from];
	let destination = vertices[to];

	let queue = departure.edges.map(item => item);
	let count = k;

	departure._weigth = 0;

	while(count >= 0 && queue.length !== 0) {
		for(let i = 0, len = queue.length; i < len; i++) {
			let edge = queue.shift();
			let startNode = edge.start;
			let endNode = edge.end;

			if(endNode._weigth > startNode._weigth + edge.cost) {
				endNode._weigth = startNode._weigth + edge.cost;
				endNode.prev = startNode;
			}

			endNode.edges.forEach(edge => {
				queue.push(edge);
			});
		}
		count--;
	}

	let path = [];

	for(let node = destination; node !== undefined; node = node.prev) {
		path.unshift(node.name);
	}

	// No route available
	if(path.length === 1) {
		path = [];
	}

	return {
		path,
		cost: destination._weigth
	}
}
