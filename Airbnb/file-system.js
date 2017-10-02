/*

建立file system, addValue(path, value), setValue(path, value), getValue, watch(path, callback).

Similar to Trie
*/

/*
	Test cases:

	fileSystem.addValue('a/b', 2);
	fileSystem.addValue('a/b/c', 3);
	fileSystem.setValue('a/b', 5);
	console.log(fileSystem.getValue('a/b'));
	console.log(fileSystem.watch('a/b/c', function() {
		console.log('a/b/c watcher: ' + this.val);
	}));
	fileSystem.setValue('a/b/c', 6);
*/

function FileSystem() {
	let root = {
		children: {}
	};

	this.getRoot = function() {
		return root;
	}
}

FileSystem.prototype.getNode = function(path) {
	let levels = path.split('/');

	let pointer = this.getRoot();

	for(let i = 0, len = levels.length; i < len; i++){
		if(pointer.children[levels[i]]) {
			pointer = pointer.children[levels[i]];
		} else {
			return null;
		}
	}

	return pointer;
}

FileSystem.prototype.addValue = function(path, value) {
	let levels = path.split('/');

	let pointer = this.getRoot();

	levels.forEach(level => {
		if(pointer.children[level]) {
			pointer = pointer.children[level];
		} else {
			let newNode = {
				name: level,
				children: {},
				val: null,
				watchers: []
			};

			pointer.children[level] = newNode;
			pointer = newNode;
		}
	});

	pointer.val = value;
}

FileSystem.prototype.setValue = function(path, value) {
	let node = this.getNode(path);

	if(node === null) {
		return false;
	}

	node.val = value;

	// call all the watchers
	if(node.watchers.length !== 0) {
		node.watchers.forEach(watcher => {
			watcher.call(node);
		})
	}
}

FileSystem.prototype.getValue = function(path) {
	let node = this.getNode(path);

	if(node === null) {
		return null;
	}

	return node.val;
}

FileSystem.prototype.watch = function(path, callback) {
	let node = this.getNode(path);

	if(node === null) {
		return false;
	}

	node.watchers.push(callback);

	return true;
}
