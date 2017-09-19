/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
	let d = [];
	let sLen = s.length;
	let pLen = p.length;

	for(let i = 0; i <= sLen; i++) {
		let level = [];

		for(let j = 0; j <= pLen; j++) {
			level.push(false);
		}

		d.push(level);
	}

	d[0][0] = true;

	for(let i = 1; i <= pLen; i++) {
		if(p[i - 1] === '*' && d[0][i - 1]) {
			d[0][i] = true;
		}
	}

	for(let i = 1; i <= sLen; i++) {
		for(let j = 1; j <= pLen; j++) {
			if(p[j - 1] === '?' || p[j - 1] === s[i - 1]) {
				d[i][j] = d[i - 1][j - 1];
			} else if (p[j - 1] === '*') {
				d[i][j] = d[i][j - 1] || d[i - 1][j];
			}
		}
	}

	return d[sLen][pLen];
};