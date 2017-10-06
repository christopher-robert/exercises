/*

Implement a basic calculator to evaluate a simple expression string.

The expression string contains only non-negative integers, +, -, *, / operators and empty spaces . The integer division should truncate toward zero.

You may assume that the given expression is always valid.

Some examples:

"3+2*2" = 7
" 3/2 " = 1
" 3+5 / 2 " = 5

*/

/**
 * @param {string} s
 * @return {number}
 */

 var calculate = function(s) {
	if(typeof s !== 'string' || s.length === 0) {
		return 0;
	}

	let stack = [];

	for(let i = 0, len = s.length; i < len;) {
		if(s[i] === ' ') {
			i++;
			continue;
		}

		if(s[i] >= '0' && s[i] <= '9') {
			let start = i;

			while(s[i] >= '0' && s[i] <= '9' && i < len) {
				i++;
			}

			stack.push(Number(s.slice(start, i)));
		} else if(s[i] === '+' || s[i] === '-') {
			stack.push(s[i]);
			i++;
		} else if(s[i] === '*' || s[i] === '/') {
			let operator = s[i];

			i++;

			while(s[i] === ' ') {
				i++;
			}

			let start = i;

			while(s[i] >= '0' && s[i] <= '9' && i < len) {
				i++;
			}

			let firstNum = stack.pop();
			let secondNum = Number(s.slice(start, i));
			let res = operator === '*' ? firstNum * secondNum : Math.floor(firstNum / secondNum);

			stack.push(res);
		}
	}

	let res = stack[0];

	for(let i = 1, len = stack.length; i < len; i +=2) {
		let operator = stack[i];
		let secondNum = stack[i + 1];

		res = operator === '+' ? res + secondNum : res - secondNum;
	}

	return res;
};

//  var calculate = function(s) {
// 	if(typeof s !== 'string' || s.length === 0) {
// 		return 0;
// 	}

// 	let stack = [];
// 	let num = 0;
// 	let sign = '+';

// 	for(let i = 0, len = s.length; i < len; i++) {
// 		if(s[i] >= '0' && s[i] <= '9') {
// 			num = num * 10 + (s[i] - '0');
// 		}

// 		if((s[i] < '0' || s[i] > '9') && s[i] !== ' ' || i === len - 1) {
// 			switch(sign) {
// 				case '+': 
// 					stack.push(num);
// 					break;
// 				case '-':
// 					stack.push(-num);
// 					break;
// 				case '*':
// 					stack.push(stack.pop() * num);
// 					break;
// 				case '/':
// 					let prev = stack.pop();

// 					stack.push(prev >= 0 ? Math.floor(prev / num) : Math.ceil(prev / num));
// 			}

// 			sign = s[i];
// 			num = 0;
// 		}
// 	}

// 	let res = stack.reduce((prev, curr) => prev + curr, 0);

// 	return res
// };
