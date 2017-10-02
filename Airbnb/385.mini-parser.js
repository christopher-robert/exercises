/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * function NestedInteger() {
 *
 *     Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     @return {boolean}
 *     this.isInteger = function() {
 *         ...
 *     };
 *
 *     Return the single integer that this NestedInteger holds, if it holds a single integer
 *     Return null if this NestedInteger holds a nested list
 *     @return {integer}
 *     this.getInteger = function() {
 *         ...
 *     };
 *
 *     Set this NestedInteger to hold a single integer equal to value.
 *     @return {void}
 *     this.setInteger = function(value) {
 *         ...
 *     };
 *
 *     Set this NestedInteger to hold a nested list and adds a nested integer elem to it.
 *     @return {void}
 *     this.add = function(elem) {
 *         ...
 *     };
 *
 *     Return the nested list that this NestedInteger holds, if it holds a nested list
 *     Return null if this NestedInteger holds a single integer
 *     @return {NestedInteger[]}
 *     this.getList = function() {
 *         ...
 *     };
 * };
 */
/**
 * @param {string} s
 * @return {NestedInteger}
 */

 function NestedInteger() {
 	this.num = null;
 	this.list = [];

 	this.setInteger = function(value) {
 		this.num = value;
 	}

 	this.add = function(elem) {
 		this.list.push(elem);
 	}
 }

var deserialize = function(s) {
	// check the type
	if(typeof s !== 'string' || s.length === 0) {
		return '';
	}

	let res = new NestedInteger();

	for(let i = 0, len = s.length; i < len;) {
		if(s[i] >= '1' && s[i] <= '9' || s[i] === '-') {
			let start = i;

			while(s[i] !== ',' && i < len) {
				i++;
			}
			res.setInteger(Number(s.slice(start, i)));
		} else if (s[i] === '[') {
			let start = i + 1;
			let level = 1;
			i++;
			while(level > 0 && i < len) {
				if(s[i] === '[') {
					level++;
				}

				if(s[i] === ']') {
					level--;
				}

				i++;
			}

			let list = s.slice(start, i - 1);

			if(list.length !== 0) {
				res.add(deserialize(list));
			}
		} else {
			i++;
		}
	}

	return res;
    
};