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

// startIndex is for de-duplicate
function recursionHelper(menu, target, startIndex, currSol, res) {
	if(target < 0) {
		return;
	}

	if(target === 0) {
		res.push(currSol.slice());

		return;
	}

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
	let vertices = {};

	Object.keys(map).forEach(key => {
		let list = map[key];

		for(let i = 0, len = list.length; i < len; i++) {
			if(vertices[list[i]] === undefined) {
				vertices[list[i]] = {
					val: list[i],
					to: [],
					inDegree: 0,
					prioritized: key === '1'
				};
			}
		}

		for(let i = 0, len = list.length - 1; i < len; i++) {
			let toVertex = vertices[list[i + 1]];
			toVertex.inDegree++;
			vertices[list[i]].to.push(toVertex);
		}
	});

	// find the root
	let root = null;

	Object.keys(vertices).forEach(key => {
		if(vertices[key].inDegree === 0) {
			root = vertices[key];
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

