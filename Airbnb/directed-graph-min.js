/*
	Test Cases:

	let list = [
		[1, 2],
		[2, 3],
		[3, 4]
	];

	list = [
		[1, 2],
		[2, 3],
		[3, 4],
		[5, 6]
	];
	console.log(getMinVertex(list));
*/

/* 

	brute force solution
*/


function getMinVertex(list) {
	// build the graph
	let graph = {};

	list.forEach(edge => {
		let from = graph[edge[0]];

		if(!from) {
			from = {
				val: edge[0],
				children: [],
				visited: false
			}

			graph[edge[0]] = from;
		}
		
		let to = graph[edge[1]];

		if(!to) {
			to = {
				val: edge[1],
				children: [],
				visited: false
			}

			graph[edge[1]] = to;
		}

		from.children.push(to);
	});

	let minSet = {
		len: Infinity,
		res: []
	};

	Object.keys(graph).forEach(vertex => {
		resetGraph(graph);
		dfs(graph[vertex], graph, [], minSet);
	});

	return minSet.res;
}

function resetGraph(graph) {
	Object.keys(graph).forEach(key => {
		graph[key].visited = false;
	});
}

function getNextVertex(graph) {
	let keys = Object.keys(graph);

	for(let i = 0, len = keys.length; i < len; i++){
		if(graph[keys[i]].visited === false) {
			return graph[keys[i]];
		}
	}

	return null;
}

function dfs(vertex, graph, res, minSet) {
	let stack = [vertex];

	res.push(vertex.val);

	while(stack.length !== 0) {
		let node = stack.pop();

		node.visited = true;
		node.children.forEach(child => {
			if(!child.visited) {
				stack.push(child);
			}
		});
	}

	vertex = getNextVertex(graph);

	if(vertex) {
		dfs(vertex, graph, res, minSet);
	} else if (res.length < minSet.len) {
		minSet.len = res.length;
		minSet.res = res;
	}
}
