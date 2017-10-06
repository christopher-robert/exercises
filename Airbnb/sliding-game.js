/*
	Test cases:

	let board = [
		[1,'#', 3],
		[4, 2, 6],
		[7, 5, 8]
	];

	let board = [
		[5, 1, 2],
		[4, 8, 6],
		[7, 3, '#']
	];

*/


function State(board, steps) {
	this.board = board ? board : [];
	this.steps = steps ? steps : [];
	this.lastStep = null;
}

State.prototype.isFinal = function() {
	let board = this.board;
	let len = board.length;

	for(let i = 0; i < len; i++) {
		for(let j = 0; j < len; j++) {
			if(i === len - 1 && j === len - 1) continue;
			if(board[i][j] !== i * len + j + 1) {
				return false;
			}
		}
	}

	return true;
}

function shuffle(board) {
	let arr = ['#'];
	let len = board.length;

	for(let i = 1, len = board.length * board.length; i < len; i++) {
		arr[i] = i;
	}

	let end = arr.length;
	let index;

	for(let i = 0; i < len; i++) {
		for(let j = 0; j < len; j++) {
			// pick a remaining element
			index = Math.floor(Math.random() * end--);

			board[i][j] = arr[index];

			// And swap it with the current element.
			temp = arr[end];
			arr[end] = arr[index];
			arr[index] = temp;
		}
	}
}

function swap(arr, x1, y1, x2, y2) {
	let temp = arr[x1][y1];

	arr[x1][y1] = arr[x2][y2];
	arr[x2][y2] = temp;
}

function copyState(state) {
	let newBoard = [];
	let len = state.board.length;

	for(let i = 0; i < len; i++) {
		newBoard[i] = [];

		for(let j = 0; j < len; j++) {
			newBoard[i][j] = state.board[i][j];
		}
	}

	let newSteps = [].concat(state.steps);

	return new State(newBoard, newSteps);
}

function getNextStates(state) {
	// get the empty location
	let res = [];
	let len = state.board.length;
	let x;
	let y;

	for(let i = 0; i < len; i++) {
		for(let j = 0; j < len; j++) {
			if(state.board[i][j] === '#') {
				x = i;
				y = j;
				break;
			}
		}
	}

	// get all possible next states
	if(x <= board.length - 2 && state.lastStep !== 'up') {
		let newState = copyState(state);

		swap(newState.board, x, y, x + 1, y);

		newState.steps.push('down');
		newState.lastStep = 'down';

		res.push(newState);
	}

	if(x >= 1 && state.lastStep !== 'down') {
		let newState = copyState(state);

		swap(newState.board, x, y, x - 1, y);

		newState.steps.push('up');
		newState.lastStep = 'up';

		res.push(newState);
	}

	if(y <= board.length - 2 && state.lastStep !== 'left') {
		let newState = copyState(state);

		swap(newState.board, x, y, x, y + 1);

		newState.steps.push('right');
		newState.lastStep = 'right';

		res.push(newState);
	}


	if(y >= 1 && state.lastStep !== 'right') {
		let newState = copyState(state);

		swap(newState.board, x, y, x, y - 1);

		newState.steps.push('left');
		newState.lastStep = 'left';

		res.push(newState);
	}

	return res;
}

function solve(board) {
	let state = new State(board);
	let queue = [state];
	let len = 1;

	while(queue.length !== 0) {
		let nextLen = 0;

		for(let i = 0; i < len; i++) {
			let currState = queue.shift();

			if(currState.isFinal()) {
				return currState.steps;
			}

			getNextStates(currState).forEach(child => {
				queue.push(child);
				nextLen++;
			})
		}

		len = nextLen;
	}

	return []; // no solution
}
