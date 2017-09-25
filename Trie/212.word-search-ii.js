/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */

 /* Test case:

 		let board = [
		  ['o','a','a','n'],
		  ['e','t','a','e'],
		  ['i','h','k','r'],
		  ['i','f','l','v']
		];

		let words = ["oath","pea","eat","rain"];

		console.log(findWords(board, words));
*/

 // Use a simplified trie
function buildUpTrie(words) {
	let root = new TrieNode();

	words.forEach(word => {
		let pointer = root;
		let chars = word.split('');

		for(let i = 0, iLen = chars.length; i < iLen; i++) {
			if(pointer.children[chars[i]] === undefined) {
				let node = new TrieNode();

				pointer.children[chars[i]] = node;
				pointer = node;
			} else {
				pointer = pointer.children[chars[i]];
			}
		}

		pointer.word = word;
	});

	return root;
}

function TrieNode() {
	this.children = {};
	this.word = null;
}

var findWords = function(board, words) {
	// build the trie
	let root = buildUpTrie(words);
	let res = [];

	for(let i = 0, height = board.length; i < height; i++) {
		for(let j = 0, width = board[i].length; j < width; j++) {
			recursionHelper(board, i, j, root, res);
		}
	}

	return res;
};

function recursionHelper(board, i, j, pointer, res) {
	// base case
	let c = board[i][j];

	if(c === '#' || pointer.children[c] === undefined) {
		return;
	}

	pointer = pointer.children[c];

	if(pointer.word) {
		res.push(pointer.word);

		pointer.word = null; // de-pulicate 
	}

	// mark as used
	board[i][j] = '#';

	// go to four directions
	if(i < board.length - 1) {
		recursionHelper(board, i + 1, j, pointer, res);
	}

	if(j < board[0].length - 1) {
		recursionHelper(board, i, j + 1, pointer, res);
	}

	if(i > 0) {
		recursionHelper(board, i - 1, j, pointer, res);
	}

	if(j > 0) {
		recursionHelper(board, i, j - 1, pointer, res);
	}

	// restore
	board[i][j] = c;
}
