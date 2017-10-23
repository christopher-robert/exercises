/* Faltten 2D */
function TwoDIterator(arr) {
	if(!Array.isArray(arr) || arr.length === 0) {
		return null
	}

	let x = 0;
	let y = 0;

	this.hasNext = function() {
		if(x >= arr.length) {
			return false;
		}

		if(y < arr[x].length) {
			return true;
		} else {
			x++;
			y = 0;

			if(x >= arr.length) {
				return false;
			}
		}

		return true;
	}

	this.next = function() {
		return arr[x][y++];
	}


	this.remove = function(row) {
		if(row < 0 || row >= arr.length) {
			return false;
		}

		for(let i = row; i < arr.length; i++) {
			arr[i] = arr[i + 1];
		}

		arr.pop();

		if(row === x) {
			y = 0;
		} else if(row < x) {
			x--;
		}

		return true;
	}
}

/** Meeting rooms */
function findSchedule(schedules) {
	if(!Array.isArray(schedules) || schedules.length === 0) {
		return [];
	}

	let timetable = [];

	schedules.forEach(schedule => {
		schedule.forEach(slot => {
			timetable.push(slot);
		})
	});

	if(timetable.length === 0) {
		return [[1, 24]];
	}

	timetable.sort((a, b) => {
		if(a[0] !== b[0]) {
			return a[0] - b[0];
		} else {
			return a[1] - b[1];
		}
	});

	let res = [];

	for(let i = 0, len = timetable.length - 1; i < len; i++) {
		if(timetable[i][1] < timetable[i + 1][0]) {
			res.push([timetable[i][1], timetable[i + 1][0]]);
		}
	}

	return res;
}

/* Menu Order */
function getExactAmountOrder(menu, money) {
	if(!Array.isArray(menu) || menu.length === 0) {
		return [];
	}

	let res = [];
	let currSol = [];

	recursionHelper(menu, Number(money), 0, currSol, res);

	return res;
}

function recursionHelper(menu, target, startIndex, currSol, res) {
	if(target < 0) {
		return;
	}

	if(target === 0) {
		res.push(currSol.slice());

		return;
	}

	// startIndex is for de-duplicate
	for(let i = startIndex, len = menu.length; i < len; i++) {
		currSol.push(menu[i].item);

		recursionHelper(menu, target - Number(menu[i].price), i, currSol, res);

		currSol.splice(currSol.length - 1);
	}
}

/* Regex Matching */
function isRegexMatch(s, p) {
	let d = [];
	let sLen = s.length;
	let pLen = p.length;

	for(let i = 0; i <= sLen; i++) {
		d[i] = [];

		for(let j = 0; j <= pLen; j++) {
			d[i][j] = false;
		}
	}

	d[0][0] = true;

	// initial state
	for(let i = 2; i <= pLen; i++) {
		if(p[i - 1] === '*' && d[0][i - 2]) {
			d[0][i] = true;
		}
	}

	// loop 
	for(let i = 1; i <= sLen; i++) {
		for(let j = 1; j <= pLen; j++) {
			if(s[i - 1] === p[j - 1] || p[j - 1] === '.') {
				d[i][j] = d[i - 1][j - 1];
			} else if(p[j - 1] === '*') {
				if(s[i - 1] === p[j - 2] || p[j - 2] === '.') {
					d[i][j] = d[i][j - 2] || d[i - 1][j] || d[i][j - 1];
				} else {
					d[i][j] = d[i][j - 2];
				}
			}
		}
	}

	return d[sLen][pLen];
}

/* Wildcard Matching */
function isWildCardMatching(s, p) {
	let d = [];
	let sLen = s.length;
	let pLen = p.length;

	for(let i = 0; i <= sLen; i++) {
		d[i] = [];

		for(let j = 0; j <=pLen; j++) {
			d[i][j] = false;
		}
	}

	d[0][0] = true;

	for(let i = 1; i <= pLen; i++) {
		if(p[i - 1] === '*') {
			d[0][i] = d[0][i - 1];
		}
	}


	for(let i = 1; i <= sLen; i++) {
		for(let j = 1; j <= pLen; j++) {
			if(p[i - 1] === '?' || p[i - 1] === s[i - 1]) {
				d[i][j] = d[i - 1][j - 1];
			} else if(p[i - 1] === '*') {
				d[i][j] = d[i - 1][j] || d[i][j - 1];
			}
		}
	}

	return d[sLen][pLen];
}

/* Buddy List*/
function getBuddyList(yours, buddies) {
	let map = {};

	yours.forEach(city => {
		map[city] = true;
	});

	let list = [];

	buddies.forEach((cities, index) => {
		let buddy = {
			name: index,
			priority: 0,
			remains: []
		};

		cities.forEach(city => {
			if(map[city]) {
				buddy.priority++;
			} else {
				buddy.remains.push(city);
			}
		});

		list.push(buddy);
	});

	list.sort((a, b) => {
		return b.priority - a.priority;
	});

	return list;
}

function getCitiesRecommend(your, buddies, max) {
	let buddyList = getBuddyList(your, buddies);
	/* Use map to de-duplicate */ 
	let list = {};

	for(let i = 0, j = 0, len = buddyList.length; i < len && j < max; i++) {
		let cities = buddyList[i].remains;

		for (let m = 0, mLen = cities.length; m < mLen && j < max; m++) {
			if(list[cities[m]] === undefined) {
				list[cities[m]] = true;
				j++;
			}
		}
	}

	return Object.keys(list);
}

/* csv parser */
function parseCSV(source) {
	if(typeof source !== 'string') {
		return null;
	}

	let entries = source.split('\n');
	let res = [];

	entries.forEach(entry => {
		let items = [];
		let item = '';
		let inQuote = false;
		for(let i = 0, len = entry.length; i < len; i++) {
			let c = entry[i];

			if(inQuote) {
				if(c !== '"') {
					item = item + c;
				}

				if(c === '"' && (i + 1 === len || entry[i + 1] !== '"' && entry[i - 1] === '"')) {
					item = item + '"'
				}

				if(c === '"' && (i + 1 === len || entry[i + 1] === ',')) {	
					i++;				
					inQuote = false;
					items.push(item);
					item = ''; 
				}
			} else {
				if(c === ',') {
					items.push(item);
					item = '';
				} else if(c === '"') {
					inQuote = true;
				} else {
					item = item + c;
				}
			}
		}

		if(item !== '') {
			items.push(item);
		}

		res.push(items.join('|'));
	});

	return res.join('\n');
}

/* Palindrome Pairs */
function palindromePairs(words) {
	if(!Array.isArray(words) || words.length === 0) {
		return [];
	}

	let hash = {};

	words.forEach((word, index) => {
		hash[reverseWord(word)] = index; 
	});

	let res = [];

	words.forEach((word, index) => {
		// empty string
		if(word.length === 0) {
			words.forEach((aWord, aIndex) => {
				if(aIndex !== index && isPalindrome(aWord)) {
					res.push([index, aIndex]);
				}
			});
		}

		for(let i = 0, len = word.length; i < len; i++) {
			let s1 = word.slice(0, i);
			let s2 = word.slice(i);
			let index1 = hash[s1];
			let index2 = hash[s2];

			if(isPalindrome(s1) && index2 !== undefined && index2 !== index) {
				res.push([hash[s2], index]);
			}

			if(isPalindrome(s2) && index1 !== undefined && index1 !== index) {
				res.push([index, hash[s1]]);
			}
		}
	});

	return res;
}

function reverseWord(word) {
	return word.split('').reverse().join('');
}

function isPalindrome(word) {
	let left = 0;
	let right = word.length - 1;

	while(left <= right) {
		if(word[left++] !== word[right--]) {
			return false;
		}
	}

	return true;
}

/* Peference List */

	// map = {
	// 	1: [1, 8, 9],
	// 	2: [2, 1],
	// 	3: [9, 3]
	// }

function getPerfenceList(map) {
	// build the graph
	let vertice = {};

	Object.keys(map).forEach(key => {
		let list = map[key];

		for(let i = 0, len = list.length; i < len; i++) {
			if(vertice[list[i]] === undefined) {
				vertice[list[i]] = {
					val: list[i],
					to: [],
					inDegree: 0,
					prioritized: key === '1'
				};
			}
		}

		for(let i = 0, len = list.length - 1; i < len; i++) {
			let toVertex = vertice[list[i + 1]];
			toVertex.inDegree++;
			vertice[list[i]].to.push(toVertex);
		}
	});

	// find the root
	let root = null;

	Object.keys(vertice).forEach(key => {
		if(vertice[key].inDegree === 0) {
			root = vertice[key];
		}
	});

	//topological order
	let queue = [root];
	let res = [];

	while(queue.length !== 0) {
		let nextLevel = [];

		for(let i = 0, len = queue.length; i < len; i++) {
			let vertex = queue.shift();

			res.push(vertex.val);

			vertex.to.forEach(node => {
				// remove duplicate
				if(!nextLevel.includes(node)) {
					if(node.prioritized) {
						nextLevel.unshift(node);
					} else {
						nextLevel.push(node);
					}
				}
			});
		}

		queue = nextLevel;
	}

	return res;
}

/* flights */

// let res = getBestRoute([
// 	['A', 'B', 1],
// 	['A', 'C', 1],
// 	['B', 'D', 2],
// 	['C', 'D', 3]], 'A', 'D', 2);

function getBestRoute(ticketInfo, from, to, limit) {
	// build the graph
	let vertice = {};

	ticketInfo.forEach(ticket => {
		let city1 = ticket[0];
		let city2 = ticket[1];

		if(vertice[city1] === undefined) {
			vertice[city1] = {
				name: city1,
				edges: [],
				weight: Infinity
			};
		}

		if(vertice[city2] === undefined) {
			vertice[city2] = {
				name: city2,
				edges: [],
				weight: Infinity
			};
		}

		vertice[city1].edges.push({
			from: vertice[city1],
			to: vertice[city2],
			weight: ticket[2]
		});
	});

	// topological order
	vertice[from].weight = 0;

	let queue = [vertice[from]];

	while(queue.length !== 0 && limit >= 0) {
		for(let i = 0, len = queue.length; i < len; i++) {
			let vertex = queue.shift();

			vertex.edges.forEach(edge => {
				if(edge.to.weight > edge.from.weight + edge.weight) {
					edge.to.weight = edge.from.weight + edge.weight;
					edge.to.prev = edge.from;
				}

				if(!queue.includes(edge.to)) {
					queue.push(edge.to);
				}
			});
		}

		limit--;
	}

	// no route
	let destination = vertice[to];

	if(destination.weight === Infinity) {
		return false;
	}

	let res = {
		path: [], 
		cost: destination.weight
	}

	// get path
	while(destination) {
		res.path.unshift(destination.name);
		destination = destination.prev;
	}

	return res;
}

/* Text justification */
function fullJustify(words, maxWidth) {
	if(!Array.isArray(words) || maxWidth <= 0) {
		return '';
	}

	let lines = [];
	let line = [words[0]];

	for(let i = 1, len = words.length; i < len; i++) {
		if(getLineLen(line) + 1 + words[i].length> maxWidth) {
			lines.push(padLine(line, maxWidth));
			line = [];
		}
			line.push(words[i]);
		
	}

	// the last line
	if(line.length !== 0) {
		let lastLine = line.join(' ');

		for(let i = 0, len = maxWidth - lastLine.length; i < len; i++) {
			lastLine += ' ';
		}

		lines.push(lastLine);
	}

	return lines;
}

function getLineLen(line) {
	return (line.length - 1) + line.reduce((prev, curr) => {
		return prev + curr.length;
	}, 0);
}

function padLine(line, maxWidth) {
	let spaces = maxWidth - getLineLen(line) + line.length - 1;
	let slots = line.length - 1;
	let res = '';

	if(slots === 0) {
		res = line[0];

		for(let i = 0 , len = spaces; i < spaces; i++) {
			res += ' ';
		}
		
		return res;
	}

	let base = Math.floor(spaces / slots);
	let baseString = '';

	for(let i = 0; i < base; i++) {
		baseString += ' ';
	}

	for(let i = 0, len = line.length; i < len; i++) {
		res += line[i];

		if(i === 0 && spaces % slots !== 0) {
			res = res + baseString + ' ';
		} else if (i !== len - 1){
			res = res + baseString;
		}
	}

	return res;
}

/* Round Number */
function roundedNum(nums) {
	if(!Array.isArray(nums) || nums.length === 0) {
		return [];
	}

	let sum = Math.round(nums.reduce((prev, curr) => {
		return prev + curr;
	}, 0));

	let res = nums.map(num => Math.floor(num));

	let flooredSum = res.reduce((prev, curr) => {
		return prev + curr;
	}, 0);

	let diff = sum - flooredSum;

	let queue = nums.map((num, index) => {
		return {
			diff: Math.ceil(num) - num,
			index: index
		}
	});

	queue.sort((a, b) => {
		return a.diff - b.diff;
	});


	while(diff > 0) {
		let num = queue.shift();

		res[num.index]++;
		diff--;
	}

	return res;
}

/* IP to CIDR */

/*
	Test Cases:

	console.log(getCIDR("192.168.0.0", "192.168.2.0"));
	console.log(getCIDR("0.0.0.0", "255.255.255.255"));
	console.log(getCIDR("192.168.64.127", "192.168.127.0"));

*/

function ip2Num(ip) {
	let res = new Uint32Array(1);
	let nums = ip.split('.');

	res[0] = 0;

	nums.forEach(num => {
		res[0] = res[0] << 8;

		res[0] += Number(num);
	});

	return res;
}

function getCIDR(start, end){
	let startNum = ip2Num(start);
	let endNum = ip2Num(end);
	let diff = new Uint32Array(1);
	let count = 32;
	diff[0] = startNum[0] ^ endNum[0];

	while(diff[0] > 0) {
		diff[0] = diff[0] >>> 1;
		count--;
	}

	return start + '/' + count;
}

/* Alien Dict */

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
	The correct order is: "wertf".

	Note:

	You may assume all letters are in lowercase.
	If the order is invalid, return an empty string.
	There may be multiple valid order of letters, return any one of them is fine.
*/

function getOrder(dict) {
	if(!Array.isArray(dict) || dict.length === 0) {
		return null;
	}

	let vertice = {};


	// build the graph
	for(let i = 0, len = dict.length - 1; i < len; i++) {
		let word1 = dict[i];
		let word2 = dict[i + 1];

		for(let j = 0, jLen = Math.min(word1.length, word2.length); j < jLen; j++) {
			if(word1[j] !== word2[j]) {
				if(vertice[word1[j]] === undefined) {
					vertice[word1[j]] = {
						val: word1[j],
						children: [],
						inDegree: 0
					}
				}

				if(vertice[word2[j]] === undefined) {
					vertice[word2[j]] = {
						val: word2[j],
						children: [],
						inDegree: 0
					}
				}

				vertice[word2[j]].inDegree++;

				vertice[word1[j]].children.push(vertice[word2[j]]);
				break;
			}
		}
	}

	let root = vertice[dict[0][0]];
	let queue = [root];
	let len = 1;
	let res = [];

	while(queue.length !== 0) {
		let vertex = queue.shift();

		res.push(vertex.val);

		vertex.children.forEach(child => {
			child.inDegree--;

			if(!queue.includes(child)) {
				queue.push(child);
			}
		});

		let next = -1;

		for(let i = 0, len = queue.length; i < len; i++) {
			if(queue[i].inDegree === 0) {
				next = i;
				break;
			}
		}

		if(next !== -1) {		
			let nextNode = queue[next];

			queue.splice(next, 1);
			queue.unshift(nextNode);
		}
	}

	return res.join('');
}

/* File System */

function FileSystem() {
	this.root = {
		val: null,
		children: {}
	};
}

FileSystem.prototype.addValue = function(path, val) {
	let segs = path.split('/');
	let pointer = this.root;

	for(let i = 0, len = segs.length; i < len; i++) {
		if(pointer.children[segs[i]] === undefined) {
			pointer.children[segs[i]] = {
				val: null,
				children: {},
				watchers: []
			}
		}

		pointer = pointer.children[segs[i]];
	}

	pointer.val = val;

	return true;
}

FileSystem.prototype.setValue = function(path, val) {
	let segs = path.split('/');
	let pointer = this.root;

	for(let i = 0, len = segs.length; i < len; i++) {
		if(pointer.children[segs[i]] === undefined) {
			return false;
		}

		pointer = pointer.children[segs[i]];
	}

	pointer.val = val;

	pointer.watchers.forEach(watcher => {
		watcher.call(this);
	});

	return true;
}

FileSystem.prototype.getValue = function(path) {
	let segs = path.split('/');
	let pointer = this.root;

	for(let i = 0, len = segs.length; i < len; i++) {
		if(pointer.children[segs[i]] === undefined) {
			return null;
		}

		pointer = pointer.children[segs[i]];
	}

	return pointer.val;
}

FileSystem.prototype.watch = function(path, callback) {
	let segs = path.split('/');
	let pointer = this.root;

	for(let i = 0, len = segs.length; i < len; i++) {
		if(pointer.children[segs[i]] === undefined) {
			return false;
		}

		pointer = pointer.children[segs[i]];
	}

	pointer.watchers.push(callback);
	
	return true;
}

/* Circular Buffer */

function CircularBuffer(n) {
	this.limit = n;
	this._arr = [];
	this._size = 0;
	this._head = 0;
	this._tail = 0;

}

CircularBuffer.prototype.add = function(val) {
	this._arr[this._tail] = val;

	if(this._head === this.tail && this._size > 0) {
		this._head = (this._head + 1) % this.limit;
	}
	this._tail = (this._tail + 1) % this.limit;
	this._size = this._size + 1 >= this.limit ? this.limit : this._size + 1;
}

CircularBuffer.prototype.get = function() {
	if(this._size === 0) {
		return null;
	}
	let val = this._arr[this._head];

	this._head = (this._head + 1) % this.limit;

	this._size--;

	return val;
}

CircularBuffer.prototype.toString = function() {
	let res = [];
	let j = this._head;

	for(let i = 0; i < this._size; i++) {
		res.push(this._arr[j]);

		j = (j + 1) % this.limit;
	}

	return res.join(',');
}

/* Display Page */
function getPages(arr) {
	let rankings = arr.map(entry => entry.split(','));
	let pages = [];
	let page = [];
	let map = {};
	let extra = [];

	while(rankings.length !== 0) {
		let entry = rankings.shift();

		if(map[entry[0]] === undefined) {
			map[entry[0]] = true;
			page.push(entry);
		} else {
			extra.push(entry);
		}

		if(page.length === 12) {
			pages.push(page);
			page = [];
			map = {};
			rankings = extra.concat(rankings);
			extra = [];
		}
	}

	if(page.length !== 0) {
		pages.push(page);
	}

	if(extra.length !== 0) {
		pages.push(extra);
	}

	pages.forEach(page => page.map(entry => entry.join('')));

	return pages;
}

/* Rectangular Overlapping */
function getOverlappingRects(rects) {
	if(!Array.isArray(rects) || rects.length <= 1) {
		return 0;
	}

	let len = rects.length;
	let union = new UnionFind(len);


	for(let i = 0; i < len; i++) {
		for(let j = i + 1; j < len; j++) {
			if(isIntersect(rects[i], rects[j])) {
				union.union(i, j);
			}
		}
	}

	return union.count;
}

function isIntersect(a, b) {
	return !(b[1][0] < a[0][0] || b[0][0] > a[1][0] || b[0][1] > a[1][1] || b[1][1] < a[0][1]);
}

function UnionFind(n) {
	this.count = n;
	this.arr = [];

	for(let i = 0; i < n; i++) {
		this.arr[i] = i;
	}

	this.root = function(i) {
		while(i !== this.arr[i]) {
			this.arr[i] = this.arr[this.arr[i]];
			i = this.arr[i];
		}

		return i;
	}

	this.union = function(i, j) {
		let a = this.root(i);
		let b = this.root(j);

		if(a !== b) {
			this.arr[a] = b;
			this.count--;
		}
	}
}

/* Sliding Game */
function State(board) {
	this.board = board;
	this.steps = [];

	let size = board.length;

	for(let i = 0; i < size; i++) {
		for(let j = 0; j < size; j++) {
			if(this.board[i][j] === '#') {
				this.position = {
					x: i,
					y: j
				};
			}
		}
	}
}

State.prototype.isFinal = function() {
	let size = this.board.length;

	for(let i = 0; i < size; i++) {
		for(let j = 0; j < size; j++) {
			if(i === size - 1 && j === size - 1) {
				return this.board[i][j] === '#';
			}

			if(this.board[i][j] !== i * size + j + 1) {
				return false;
			}
		}
	}

	return true;
}

function copyState(state) {
	let newBoard = [];
	let board = state.board;
	let size = board.length;

	for(let i = 0; i < size; i++) {
		newBoard[i] = [];
		for(let j = 0; j < size; j++) {
			newBoard[i][j] = board[i][j];
		}
	}

	let newState = new State(newBoard);

	newState.steps = state.steps.slice(0);

	return newState;
}

function swap(state, lastPosition, newPosition) {
	let temp = state.board[lastPosition.x][lastPosition.y];

	state.board[lastPosition.x][lastPosition.y] = state.board[newPosition.x][newPosition.y];
	state.board[newPosition.x][newPosition.y] = temp;
}

function getNextStates(state) {
	let board = state.board;
	let lastPosition = state.position;
	let size = board.length;
	let lastStep = state.steps.length > 0 ? state.steps[state.steps.length - 1] : null;
	let res = [];

	if(lastPosition.x > 0 && lastStep !== 'down') {
		let newState = copyState(state);
		let newPosition = {
			x: lastPosition.x - 1,
			y: lastPosition.y
		};

		swap(newState, lastPosition, newPosition);
		newState.steps.push('top');
		newState.position = newPosition;
		res.push(newState);
	}

	if(lastPosition.x < size - 1 && lastStep !== 'top') {
		let newState = copyState(state);
		let newPosition = {
			x: lastPosition.x + 1,
			y: lastPosition.y
		};

		swap(newState, lastPosition, newPosition);
		newState.steps.push('down');
		newState.position = newPosition;
		res.push(newState);
	}

	if(lastPosition.y > 0 && lastStep !== 'right') {
		let newState = copyState(state);
		let newPosition = {
			x: lastPosition.x,
			y: lastPosition.y - 1
		};


		swap(newState, lastPosition, newPosition);
		newState.steps.push('left');
		newState.position = newPosition;
		res.push(newState);
	}

	if(lastPosition.y < size - 1 && lastStep !== 'left') {
		let newState = copyState(state);
		let newPosition = {
			x: lastPosition.x,
			y: lastPosition.y + 1
		};


		swap(newState, lastPosition, newPosition);
		newState.steps.push('right');
		newState.position = newPosition;
		res.push(newState);
	}

	return res;
}

function solveSlidingGame(board) {
	if(!Array.isArray(board) || board.length === 0) {
		return false;
	}

	let queue = [new State(board)];

	while(queue.length !== 0) {
		let state = queue.shift();

		if(state.isFinal()) {
			return state.steps;
		}

		getNextStates(state).forEach(nextState => {
			queue.push(nextState);
		});
	}

	return false;
}

/* Water Landing */
function waterLand(heights, position, count) {
	if(!Array.isArray(heights) || heights.length <= 0){
		return null;
	}

	let water = [];
	let len = heights.length;

	for(let i = 0; i < len; i++) {
		water[i] = 0;
	}

	while(count > 0) {
		count--;

		let index = position;

		while(index >= 1) {
			if(heights[index] + water[index] < heights[index - 1] + water[index - 1]) {
				break;
			}
			index--;
		}

		// if the left side is full, go to right side
		if(heights[index] + water[index] < heights[position] + water[position]) {
			water[index]++;
			continue;
		}

		index = position;

		while(index < len - 1) {
			if(heights[index] + water[index] < heights[index + 1] + water[index + 1]) {
				break;
			}

			index++;
		}

		if(heights[index] + water[index] < heights[position] + water[position]) {
			water[index]++;
			continue;
		}

		water[position]++;
	}

	// print the graph
	let hightest = 0;

	for(let i = 0; i < len; i++) {
		hightest = Math.max(hightest, heights[i] + water[i]);
	}

	let res = [];

	for(let i = hightest; i > 0; i--) {
		let level = [];

		for(let j = 0; j < len; j++) {
			if(heights[j] + water[j] < i) {
				level.push(' ');
			} else if(heights[j] >= i){
				level.push('*');
			} else {
				level.push('w');
			}
		}

		res.push(level.join(''));
	}

	return res.join('\n');
}

/* Max Square */
function maximalSquare(matrix) {
	if(!Array.isArray(matrix) || matrix.length === 0) {
		return 0;
	}

	let d = [];
	let max = 0;

	let xLen = matrix.length;
	let yLen = matrix[0].length


	for(let i = 0; i < xLen; i++) {
		d[i] = [];

		for(let j = 0; j < yLen; j++) {
			d[i][j] = Number(matrix[i][j]);

			if(d[i][j] === 1) {
				max = 1;
			}
		}
	}

	for(let i = 1; i < xLen; i++) {
		for(let j = 1; j < yLen; j++) {
			if(matrix[i][j] === '1') {
				d[i][j] = Math.min(d[i - 1][j - 1], d[i - 1][j], d[i][j - 1]) + 1;
			}

			max = Math.max(max, d[i][j]);
		}
	}

	return max * max;
}

/* Mini Parser */
function NestedInteger() {
	this.val = null;
	this.list = [];


	this.setInteger = function(val) {
		this.val = val;
	}

	this.add = function(item) {
		this.list.push(item);
	}
}

function deserialize(s) {
	if(typeof s !== 'string' || s.length === 0) {
		return null;
	}

	let nestedInteger = new NestedInteger();

	if(s[0] === '[') {
		let stripped = s.slice(1, s.length - 1);
		let items = [];
		let item = '';

		for(let i = 0, len = stripped.length; i < len; i++) {
			if(stripped[i] === ',') {
				items.push(item);
				item = '';
			} else if(stripped[i] === '[' ) {
				let level = 0;

				while(i < len) {
					item += stripped[i];

					if(stripped[i] === '[') {
						level++;
					}

					if(stripped[i] === ']') {
						level--;
					}

					if(level === 0) {
						break;
					}

					i++;
				}
			} else {
				item += stripped[i];
			}
		}

		if(item !== '') {
			items.push(item);
		}

		items.forEach(item => {
				if(Number.isInteger(Number(item))) {
					let newInteger = new NestedInteger();

					newInteger.setInteger(Number(item));
					nestedInteger.add(newInteger);
				} else {
					nestedInteger.add(deserialize(item));
				}
		});
	} else {
		nestedInteger.setInteger(Number(s));
	}

	return nestedInteger;
}

/* Calculator II */
function calculate(s) {
	if(typeof s !== 'string' || s.length === 0) {
		return 0;
	}

	let stack = [];
	let operator = '+';

	for(let i = 0, len = s.length; i < len; i++) {
		if(s[i] >= '0' && s[i] <= '9') {
			let num = '';

			while(i < len && s[i] >= '0' && s[i] <= '9') {
				num += s[i];
				i++;
			}

			num = Number(num);

			if(operator === '+') {
				// +
				stack.push(num);
			} else if(operator === '-') {
				// -
				stack.push(-num);
			} else {
				// *
				let prevNum = stack.pop();

				if(operator === '*') {
					stack.push(prevNum * num);
				}

				if(operator === '/') {
					let res = Math.floor(Math.abs(prevNum) / num);
					stack.push(prevNum < 0 ? -res : res);
				}
			}
		}

		operator = s[i];
	}

	// add up
	return stack.reduce((prev, curr) => {
		return prev + curr;
	}, 0);
}

/* House Rubber with Index */
function rob(nums) {
	if(!Array.isArray(nums) || nums.length === 0) {
		return 0;
	}

	let d = [];
	let len = nums.length;

	for(let i = 0; i < len; i++) {
		d[i] = 0;
	}

	d[0] = nums[0];
	d[1] = Math.max(nums[0], nums[1]);

	for(let i = 2; i < len; i++) {
		d[i] = Math.max(d[i - 1], d[i - 2] + nums[i]);
	}

	let res = [];

	let max = d[len - 1];

	for(let i = len - 1; i >= 2 && max > 0;) {
		if(d[i] === d[i - 2] + nums[i]) {
			res.unshift(i);
			max = max - nums[i];
			i = i - 2;
		} else {
			i = i - 1;
		}
	}

	if(max > 0) {
		if(max === nums[0]) {
			res.unshift(0);
		}

		if(max === nums[1]) {
			res.unshift(1);
		}
	}

	return {
		max: d[len - 1],
		houses: res
	}
}

/* Directed Graph Min */

/*
	Test Cases:

	let list = [
		[1, 2],
		[2, 3],
		[3, 4]
	];

	list = [
		[1, 2],
		[2, 3],
		[3, 4],
		[5, 6]
	];
	console.log(getMinVertex(list));
*/

function getMinVertex(list) {
	let vertices = {};

	list.forEach(edge => {
		if(vertices[edge[0]] === undefined) {
			vertices[edge[0]] = {
				val: edge[0],
				children: [],
				visited: false
			};
		}

		if(vertices[edge[1]] === undefined) {
			vertices[edge[1]] = {
				val: edge[1],
				children: [],
				visited: false
			};
		}

		vertices[edge[0]].children.push(vertices[edge[1]]);
	});

	let min = {
		val: Infinity
	};

	Object.keys(vertices).forEach(key => {
		resetGraph(vertices);

		let res = {
			val: 0,
			arr: []
		};

		dfs(vertices[key], vertices, res);

		if(res.val < min.val) {
			min = res;
		}
	});

	return min;
}

function resetGraph(vertices) {
	Object.keys(vertices).forEach(key => {
		vertices[key].visited = false;
	})
}

function getNextVertex(vertices) {
	let keys = Object.keys(vertices);

	for(let i = 0, len = keys.length; i < len; i++) {
		if(!vertices[keys[i]].visited) {
			return vertices[keys[i]];
		}
	}

	return null;
}

function dfs(root, vertices, res) {
	let stack = [root];

	res.val++;
	res.arr.push(root.val);

	while(stack.length !== 0) {
		let vertex = stack.pop();

		vertex.visited = true;

		vertex.children.forEach(child => {
			if(!child.visited) {
				stack.push(child)
			}
		});
	}

	let next = getNextVertex(vertices);

	if(next) {
		dfs(next, vertices, res);
	}
}

/* Wizard Distance */

function getMinWizardDistance(list) {
	let vertices = {};

	for(let i = 0, len = list.length; i < len; i++) {
		if(vertices[i] === undefined) {
			vertices[i] = {
				val: i,
				children: [],
				visited: false
			}
		}

		list[i].forEach(to => {
			if(vertices[to] === undefined) {
				vertices[to] = {
					val: to,
					children: [],
					visited: false
				}
			}

			vertices[i].children.push(vertices[to]);
		});
	}


	let queue = [vertices[0]];
	let distance = 0;
	let len = 1;

	while(queue.length !== 0) {
		let nextLen = 0;
		let i = 0;

		for(i = 0; i < len; i++) {
			let vertex = queue.shift();

			if(vertex.val === list.length - 1) {
				return distance;
			}
			
			vertex.visited = true;
			vertex.children.forEach(child => {
				if(!child.visited) {
					if(!queue.includes(child)) {
						queue.push(child);
						nextLen++;
					}
				}
			});
		}

		distance++;
		len = nextLen;
	}

	// no path
	return -1;
}


/* String Pyramid Matrix */

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
				// create a new array!!!
				nextLevels.push(pair.slice(0));
			})
		} else {
			let newNextLevels = [];

			map[root].forEach(pair => {
				nextLevels.forEach(prev => {
					if(prev[prev.length - 1] === pair[0]) {
						// create a new array!!!
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
