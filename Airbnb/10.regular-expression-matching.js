/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}

	console.log(isMatch("aa","a"));
	console.log(isMatch("aa","aa"));
	console.log(isMatch("aaa","aa"));
	console.log(isMatch("aa", "a*"));
	console.log(isMatch("aa", ".*"));
	console.log(isMatch("ab", ".*"));
	console.log(isMatch("aab", "c*a*b"));

 */

/*
Logic:

1, If p.charAt(j) == s.charAt(i) :  dp[i][j] = dp[i-1][j-1];
2, If p.charAt(j) == '.' : dp[i][j] = dp[i-1][j-1];
3, If p.charAt(j) == '*': 
   here are two sub conditions:
               1   if p.charAt(j-1) != s.charAt(i) : dp[i][j] = dp[i][j-2]  //in this case, a* only counts as empty
               2   if p.charAt(j-1) == s.charAt(i) or p.charAt(j-1) == '.':
                            dp[i][j] = dp[i-1][j]    //in this case, a* counts as multiple a 
                           or dp[i][j] = dp[i][j-1]   // in this case, a* counts as single a
                           or dp[i][j] = dp[i][j-2]   // in this case, a* counts as empty
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
