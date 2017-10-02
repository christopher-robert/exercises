/**

输入是map：几个persoon，每个person有一个自己的list，list内是整数。 
Person1：1 8 9 
Person2：2 1 
Person3： 9 3 

然后输出一个list，要求把输入map里面的所有value都放入这个list里，且这些values的相对顺序符合每一个person自己的顺序。例如一个valid的输出是: 2 1 8 9 3 
follow up: 因为这道题可能有多种符合要求的输出，如何break tie by person 1，也就是说bfs的时候每次优先选择person 1 list里面的元素。

**/

/*
	map = {
		1: [1, 8, 9],
		2: [2, 1],
		3: [9, 3]
	}
*/


function getPerfenceList(map) {
	// check the type;

	// build the graph
	let graph = {};

	for(let person in map) {
		let list = map[person];

		for(let i = 0, len = list.length; i < len - 1; i++) {
			if(graph[list[i]] === undefined) {
				graph[list[i]] = {
					val: list[i],
					edges: [],
					inDegree: 0
				};
			}

			if(graph[list[i + 1]] === undefined) {
				graph[list[i + 1]] = {
					val: list[i + 1],
					edges: [],
					inDegree: 0
				};
			}

			graph[list[i]].edges.push(list[i + 1]);
			graph[list[i + 1]].inDegree++;
		}
	}

	// find the root
	let root = null;

	for(let vertex in graph) {
		if(graph[vertex].inDegree === 0) {
			root = graph[vertex];
			break;
		}
	}

	// topological Order
	let queue = [root];
	let len = 1;
	let res = [];

	while(queue.length !== 0) {
		let nextLen = 0;

		for(let i = 0; i < len; i++) {
			let vertex = queue.shift();

			res.push(vertex.val);

			vertex.edges.forEach(edge => {
				if(!queue.includes(graph[edge])) {
					nextLen++;
					queue.push(graph[edge]);
				}
			});
		}

		len = nextLen;
	}

	return res;
}
