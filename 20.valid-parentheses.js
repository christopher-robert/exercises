/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
	let stack = [];

	for(let i = 0, len = s.length; i < len; i++) {
		if(s[i] === '(' || s[i] == '{' || s[i] === '[') {
			stack.push(s[i]);
		}

		if(s[i] === ')' || s[i] == '}' || s[i] === ']') {
			if (stack.length === 0) {
				return false;
			}

			let prev = stack.pop();

			if(s[i] === ')') {
				if(prev !== '(') {
					return false;
				}
			}

			if(s[i] === '}') {
				if(prev !== '{') {
					return false;
				}
			}

			if(s[i] === ']') {
				if(prev !== '[') {
					return false;
				}
			}
		}
	}

	return stack.length === 0;
};
