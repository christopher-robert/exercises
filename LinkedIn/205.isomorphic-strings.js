	/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
	if(typeof s !== 'string' || typeof t !== 'string' || s.length !== t.length) {
		return false;
	}

	let used = {};
	let mapping = {};

	for(let i = 0, len = s.length; i < len; i++) {
		if (used[t[i]] === true) {
			if(mapping[s[i]] !== t[i]) {
				return false;
			}
		} else {
			if(mapping[s[i]] === undefined) {
				mapping[s[i]] = t[i];
				used[t[i]] = true;
			} else {
				return false;
			}
		}
	}

	return true;
};
