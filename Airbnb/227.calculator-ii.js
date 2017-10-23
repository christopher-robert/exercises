/*

Implement a basic calculator to evaluate a simple expression string.

The expression string contains only non-negative integers, +, -, *, / operators and empty spaces . The integer division should truncate toward zero.

You may assume that the given expression is always valid.

Some examples:

"3+2*2" = 7
" 3/2 " = 1
" 3+5 / 2 " = 5

*/

/* Test cases */

/*

	console.log(calculate("3/2+2*2-3"));
	console.log(calculate("32+2*2/4-3"));
	console.log(calculate("14-3/2"));
	console.log(calculate("    30"));

*/

/**
 * @param {string} s
 * @return {number}
 */

//  var calculate = function(s) {
// 	if(typeof s !== 'string' || s.length === 0) {
// 		return 0;
// 	}

// 	let stack = [];

// 	for(let i = 0, len = s.length; i < len;) {
// 		if(s[i] === ' ') {
// 			i++;
// 			continue;
// 		}

// 		if(s[i] >= '0' && s[i] <= '9') {
// 			let start = i;

// 			while(s[i] >= '0' && s[i] <= '9' && i < len) {
// 				i++;
// 			}

// 			stack.push(Number(s.slice(start, i)));
// 		} else if(s[i] === '+' || s[i] === '-') {
// 			stack.push(s[i]);
// 			i++;
// 		} else if(s[i] === '*' || s[i] === '/') {
// 			let operator = s[i];

// 			i++;

// 			while(s[i] === ' ') {
// 				i++;
// 			}

// 			let start = i;

// 			while(s[i] >= '0' && s[i] <= '9' && i < len) {
// 				i++;
// 			}

// 			let firstNum = stack.pop();
// 			let secondNum = Number(s.slice(start, i));
// 			let res = operator === '*' ? firstNum * secondNum : Math.floor(firstNum / secondNum);

// 			stack.push(res);
// 		}
// 	}

// 	let res = stack[0];

// 	for(let i = 1, len = stack.length; i < len; i +=2) {
// 		let operator = stack[i];
// 		let secondNum = stack[i + 1];

// 		res = operator === '+' ? res + secondNum : res - secondNum;
// 	}

// 	return res;
// };

function calculate(s) {
	if(typeof s !== 'string' || s.length === 0) {
		return 0;
	}

	let stack = [];
	let operator = '+';

	for(let i = 0, len = s.length; i < len; i++) {
		if(s[i] === ' ') continue;

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

