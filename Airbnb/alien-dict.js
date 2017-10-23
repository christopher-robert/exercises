/*
	There is a new alien language which uses the latin alphabet. However, the order among letters are unknown to you. 
	You receive a list of words from the dictionary, wherewords are sorted lexicographically by the rules of this new language. 
	Derive the order of letters in this language.

	For example,
	Given the following words in dictionary,

	[
	  "wrt",
	  "wrf",
	  "er",
	  "ett",
	  "rftt"
	]


	let dict = [
	  "wa",
	  "wb",
	  "wc",
	  "a",
	  "d"
	];
	The correct order is: "wertf".

	Note:

	You may assume all letters are in lowercase.
	If the order is invalid, return an empty string.
	There may be multiple valid order of letters, return any one of them is fine.
*/


function getOrder(dict) {
	if(!Array.isArray(dict) && dict.length >= 1 ) {
		throw new TypeError('dict has to be an array');
	} 

	if(dict.length === 1) {
		if(dict[0].length === 1) {
			return dict[0];
		} else {
			return '';
		}
	}

	let vertices = {};

	// build the graph
	for(let i = 0, len = dict.length; i < len - 1; i++) {
		let pre = dict[i];
		let next = dict[i + 1];

		let j = 0;
		let pLen = pre.length;
		let nLen = next.length;

		while(j < pLen && j < nLen) {
			if(pre[j] !== next[j]) {
				let pNode = vertices[pre[j]];

				if(pNode === undefined) {
					pNode = {
						val: pre[j],
						edges: [],
						visited: false
					}

					vertices[pre[j]] = pNode;
				}

				let nNode = vertices[next[j]];

				if(nNode === undefined) {
					nNode = {
						val: next[j],
						edges: [],
						visited: false
					}

					vertices[next[j]] = nNode;
				}
				// remember to remove duplicates
				if(!pNode.edges.includes(nNode)) {
					pNode.edges.push(nNode);
				}
			}
			j++;
		}
	}

	let res = [];
	let queue = [];
	queue.push(vertices[dict[0][0]]);
	let currLen = 1;

	// topological order
	while(queue.length !== 0) {
		let nextLen = 0;

		for(let i = 0; i < currLen; i++) {
			let node = queue.shift();

			if(node.visited === true) {
				// there is a cycle
				return '';
			}

			node.visited = true;
			res.push(node.val);

			node.edges.forEach(endVertex => {
				nextLen++;
				queue.push(endVertex);
			})
		}

		currLen = nextLen;
	}

	return res.join('');
}
