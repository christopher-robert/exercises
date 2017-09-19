/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}

isMatch("aa","a") ? false
isMatch("aa","aa") ? true
isMatch("aaa","aa") ? false
isMatch("aa", "a*") ? true
isMatch("aa", ".*") ? true
isMatch("ab", ".*") ? true
isMatch("aab", "c*a*b") ? true

 */
var isMatch = function(s, p) {
	let d = [];
	let sLen = s.length;
	let pLen = p.length;

	for(let i = 0; i <= sLen; i++) {
		let level = [];

		for(let j = 0; j <= pLen; j++) {
			level[j] = false;
		}

		d.push(level);
	}

	d[0][0] = true;

	// only when a*b*c* will be true for an empty source line
	for(let i = 2; i <= pLen; i++) {
		if(p[i - 1] === '*' && d[0][i - 2]) {
			d[0][i] = true;
		}
	}

	for(let i = 1; i <= sLen; i++) {
		for(let j = 1; j <= pLen; j++) {
			if(s[i - 1] === p[j - 1] || p[j - 1] === '.') {
				d[i][j] = d[i - 1][j - 1];
			} else if(p[j - 1] === '*') {
				if(p[j - 2] !== s[i - 1] && p[j - 2] !== '.') {
					d[i][j] = d[i][j - 2];
				} else {
					d[i][j] = d[i][j - 2] || d[i][j - 1] || d[i - 1][j];
				}
			}
		}
	}

	return d[sLen][pLen];
};
