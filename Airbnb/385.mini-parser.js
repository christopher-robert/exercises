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
/*
	Test cases:

	// console.log(deserialize("[-1, -2]"));
	// console.log(deserialize("[]"));
	// console.log(deserialize("[-1]"));
	// console.log(deserialize("324"));
	// console.log(deserialize("-324"));
	// console.log(deserialize("[123,[456,[789]]]"));
*/

/**
 * @param {string} s
 * @return {NestedInteger}
 */

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