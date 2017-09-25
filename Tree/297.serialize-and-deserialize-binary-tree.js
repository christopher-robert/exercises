/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
	if(!(root instanceof TreeNode) || root == null) {
		return '';
	}

	let res = [];

	let queue = [];

	queue.push(root);
	res.push([root.val]);

	let len = 1;

	while(queue.length !== 0) {
		let nextLen = 0;
		let nextLevel = [];

		for(let i = 0; i < len; i++) {
			let node = queue.shift();
			let children = [];

			if(node.left !== null) {
				nextLen++;
				children.push(node.left.val);
				queue.push(node.left);
			} else {
				children.push('');
			}

			if(node.right !== null) {
				nextLen++;
				children.push(node.right.val);
				queue.push(node.right);
			} else {
				children.push('');
			}

			nextLevel.push(children.join(','));
		}

		res.push(nextLevel.join('#'));
		len = nextLen;
	}

	return res.join('/');
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
	if(typeof data !== 'string' || data.length === 0) {
		return null;
	}

	let levels = data.split('/');

	let root = new TreeNode(Number(levels.shift()));

	let queue = [root];

	levels.forEach(level => {
		let childrens = level.split('#');

		childrens.forEach(children => {
			let parent = queue.shift();
			let nodes = children.split(',');

			if(nodes[0] !== '') {
				parent.left = new TreeNode(Number(nodes[0]));
				queue.push(parent.left);
			}

			if(nodes[1] !== '') {
				parent.right = new TreeNode(Number(nodes[1]));
				queue.push(parent.right);
			}
		});
	});

	return root;
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */