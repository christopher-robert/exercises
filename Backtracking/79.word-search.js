/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
 /*
 	Test cases:
	console.log(exist([['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], 'ABCB'));

 */
var exist = function(board, word) {
	if (typeof word !== 'string' || word.length === 0 || !Array.isArray(board)) {
		return false;
	}

	for(let i = 0, xlen = board.length; i < xlen; i++) {
		for(let j = 0, ylen = board[0].length; j < ylen; j++) {
			if(recursionHelper(board, i, j, word, 0)) {
				return true;
			}
		}
	}

	return false;
};

function recursionHelper(board, i, j, word, index) {
	if(index >= word.length) {
		return true;
	}

	if(i < 0 || i >= board.length || j < 0 || j >= board[0].length) {
		return false;
	}

	let c = board[i][j];

	if(c === '#' || c !== word[index]) {
		return false;
	}

	index++;
	board[i][j] = '#';

	let exist = recursionHelper(board, i + 1, j, word, index) ||
		recursionHelper(board, i - 1, j, word, index) ||
		recursionHelper(board, i, j + 1, word, index) ||
		recursionHelper(board, i, j - 1, word, index);

	board[i][j] = c;

	return exist;
}
