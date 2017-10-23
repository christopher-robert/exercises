
/*

	Test cases: 

	let nodes = 'ABCD';
	let matrix = [
		[['B'], ['A', 'C'], ['D'], ['A']],
		[['D'], ['B', 'C'], ['A'], []],
		[[], [], [],['B']],
		[[], [], [], []]
	];
	console.log(getRoots(nodes, matrix)); // ['A', 'D']


	let nodes = 'ABCDEFG';
	let matrix = [
		[['B'], ['A', 'C'], ['D'], ['A'], [], [], ['B']],
		[['D'], ['B', 'C'], ['A'], [], [], ['G'], ['D']],
		[[], [], [],['B'], [], [], []],
		[[], [], [], [], [], [], []],
		[['A'], [], ['B'], [], [], [], []],
		[[], [], [], [], [], ['E'], []],
		[[], [], [], ['G'], [], ['F'], []]
	];

	let date1 = Date.now();
	console.log(getRoots(nodes, matrix));
	let date2 = Date.now();
	console.log('Time: ' + (date2 - date1));

	let date3 = Date.now();
	console.log(getRootsWithMemorization(nodes, matrix));
	let date4 = Date.now();
	console.log('Time: ' + (date4 - date3));

*/

/*
	Top-down
*/

function getRoots(nodes, matrix) {
	// transform the matrix
	let leaves = nodes.split('');
	let map = {};

	leaves.forEach(leaf => {
		map[leaf] = [];
	});

	for(let i = 0, xLen = matrix.length; i < xLen; i++) {
		for(let j = 0, yLen = matrix.length; j < yLen; j++) {
			matrix[i][j].forEach(root => {
				map[root].push([leaves[i], leaves[j]]);
			});
		}
	}

	let res = [];

	leaves.forEach(root => {
		if(getRootsRecursionHelper([root], leaves, map)) {
			res.push(root);
		}
	});

	return res;
}

function getRootsRecursionHelper(currLevel, leaves, map) {
	// base case
	debugger;

	if(currLevel.length > leaves.length) {
		return false;
	}

	if(currLevel.length === leaves.length) {
		// check duplicate
		currLevel.sort((a, b) => a - b);

		for(let i = 0, len = currLevel.length - 1; i < len; i++) {
			if(currLevel[i] === currLevel[i + 1]) {
				return false;
			}
		}

		return true;
	}

	// get next levels
	let nextLevels = [];

	currLevel.forEach((root, index) => {
		if(index === 0) {
			map[root].forEach(pair => {
				nextLevels.push(pair.slice(0));
			})
		} else {
			let newNextLevels = [];

			map[root].forEach(pair => {
				nextLevels.forEach(prev => {
					if(prev[prev.length - 1] === pair[0]) {
						let newLevel = prev.slice(0);

						newLevel.push(pair[1]);
						newNextLevels.push(newLevel);
					}
				})
			});

			nextLevels = newNextLevels;
		}
	});

	for(let i = 0, len = nextLevels.length; i < len; i++){
		if(getRootsRecursionHelper(nextLevels[i], leaves, map)) {
			return true;
		}
	};

	return false;
}

function getRootsWithMemorization(nodes, matrix) {
	// transform the matrix
	let leaves = nodes.split('');
	let newMaxtrix = {};

	leaves.forEach(leaf => {
		newMaxtrix[leaf] = [];
	});

	for(let i = 0, xLen = matrix.length; i < xLen; i++) {
		for(let j = 0, yLen = matrix.length; j < yLen; j++) {
			matrix[i][j].forEach(root => {
				newMaxtrix[root].push([leaves[i], leaves[j]]);
			});
		}
	}

	let res = [];
	let _memoHash = {};

	leaves.forEach(root => {
		if(getRootsRecursionHelperWithMemorization([root], leaves, newMaxtrix, _memoHash)) {
			res.push(root);
		}
	});

	return res;
}

function getRootsRecursionHelperWithMemorization(currLevel, leaves, matrix, _memoHash) {
	// base case
	if(currLevel.length > leaves.length) {
		return false;
	}

	if(currLevel.length === leaves.length) {
		// check duplicate
		currLevel.sort((a, b) => a - b);

		for(let i = 0, len = currLevel.length - 1; i < len; i++) {
			if(currLevel[i] === currLevel[i + 1]) {
				return false;
			}
		}

		return true;
	}

	// get next levels
	let nextLevels = [];

	currLevel.forEach((root, index) => {
		if(index === 0) {
			matrix[root].forEach(pair => {
				nextLevels.push(pair.slice(0));
			})
		} else {
			let newNextLevels = [];

			matrix[root].forEach(pair => {
				nextLevels.forEach(prev => {
					if(prev[prev.length - 1] === pair[0]) {
						let newLevel = prev.slice(0);

						newLevel.push(pair[1]);
						newNextLevels.push(newLevel);
					}
				})
			});

			nextLevels = newNextLevels;
		}
	});

	for(let i = 0, len = nextLevels.length; i < len; i++){
		let levelInString = nextLevels[i].join('');
		
		// check memorization hash
		if(_memoHash[levelInString] !== undefined) {
			return _memoHash[levelInString];
		} else {
			let res = getRootsRecursionHelper(nextLevels[i], leaves, matrix, _memoHash);

			_memoHash[levelInString] = res;

			if(res) {
				return true;
			}
		}
	};

	return false;
}
