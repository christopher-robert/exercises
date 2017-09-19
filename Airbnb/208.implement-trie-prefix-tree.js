/**
 * Initialize your data structure here.
 */
var Trie = function() {
    this.root = new TrieNode();
};

var TrieNode = function(val) {
	this.val = val;
	this.children = [];
	this.isEnd = false;
}

/**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
	if(typeof word !== 'string' || word === '') {
		return;
	}

	let chars = word.split('');
	let pointer = this.root;

	chars.forEach(c => {
		let children = pointer.children;
		let i = 0;
		let len = children.length;

		while(i < len) {
			let childNode = children[i];

			if(c === childNode.val) {
				pointer = childNode;
				break;
			}

			i++;
		}

		if(i === len) {
			let newNode = new TrieNode(c);
			children.push(newNode);
			pointer = newNode;
		}
	});

	pointer.isEnd = true;
};

/**
 * Returns if the word is in the trie. 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
	if(typeof word !== 'string') {
		return false;
	}

	let chars = word.split('');
	let pointer = this.root;
	let i = 0;
	let iLen = chars.length;

	while(i < iLen) {
		let children = pointer.children;
		let j = 0;
		let jLen = children.length;

		while(j < jLen) {
			let childNode = children[j];

			if(chars[i] === childNode.val) {
				pointer = childNode;
				break;
			}

			j++;
		}

		if(j === jLen) {
			// no match on this level
			return false;
		}
		i++;
	}

	return pointer.isEnd === true;    
};

/**
 * Returns if there is any word in the trie that starts with the given prefix. 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
	if(typeof prefix !== 'string') {
		return false;
	}

	let chars = prefix.split('');
	let pointer = this.root;
	let i = 0;
	let iLen = chars.length;

	while(i < iLen) {
		let children = pointer.children;
		let j = 0;
		let jLen = children.length;

		while(j < jLen) {
			let childNode = children[j];

			if(chars[i] === childNode.val) {
				pointer = childNode;
				break;
			}

			j++;
		}

		if(j === jLen) {
			// no match on this level
			return false;
		}
		i++;
	}

	return true; 
};

/** 
 * Your Trie object will be instantiated and called as such:
 * var obj = Object.create(Trie).createNew()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */