
/*

	Test cases: 

	let nodes = 'ABCD';
	let matrix = [
		[['B'], ['A', 'C'], ['D'], ['A']],
		[['D'], ['B', 'C'], ['A'], []],
		[[], [], [],['B']],
		[[], [], [], []]
	];
	console.log(getRoots(nodes, matrix));

*/

/*
	brute-force

*/
function getRoots(nodes, matrix) {
	let leaves = nodes.split('');
	let len = matrix.length;
	let map = {};

	for(let i = 0; i < len; i++) {
		for(let j = 0; j < len; j++) {
			if(matrix[i][j]) {
				matrix[i][j].forEach(root => {
					if(map[root] === undefined) {
						map[root] = [];
					}

					map[root].push([leaves[j], leaves[i]]);
				})
			}
		}
	}

	let res = [];

	for(let i = 0; i < len; i++) {
		if(recursionHelper([leaves[i]], map, leaves)) {
			res.push(leaves[i]);
		}
	}

	return res;
}

function recursionHelper(currLevel, map, leaves) {
	// check base case
	if(currLevel.length === leaves.length) {
		let checkMap = {};

		leaves.forEach(leaf => {
			checkMap[leaf] = false;
		});

		let noDuplidates = currLevel.every(node => {
			if(checkMap[node] === false) {
				checkMap[node] = true;
				return true;
			}

			return false;
		});

		return noDuplidates;
	}


	let len = currLevel.length;
	let nextLevels = [];

	for(let i = 0; i < len; i++) {
		let children = map[currLevel.shift()];
		
		if(children === undefined) {
			return false;
		}
		
		for(let m = 0, mLen = children.length; m < mLen; m++) {
			let child = children[m];

			if(i === 0) {
				nextLevels.push([child[0], child[1]]);
			} else {
				for(let j = 0, jLen = nextLevels.length; j < jLen; j++) {
					let nextLevel = nextLevels[j];

					if(nextLevel[nextLevel.length - 1] === child[0]) {
						let newNextLevel = nextLevel.slice();

						newNextLevel.push(child[1]);
						nextLevels.push(newNextLevel);
					}
				}
			}
		}
	}

	let filteredNextLevels = [];

	nextLevels.forEach(nextLevel => {
		if(nextLevel.length === len + 1) {
			filteredNextLevels.push(nextLevel);
		}
	})

	if(filteredNextLevels.length === 0) {
		return false;
	}

	return filteredNextLevels.some(nextLevel => {
		return recursionHelper(nextLevel, map, leaves); 
	});
}
