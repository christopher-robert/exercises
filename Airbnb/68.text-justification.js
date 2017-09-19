/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */

 /*
	Logic: greediy add words and then justify every line

	Takeaways:

	Always check if a divider is zero or not before do dividing

	Test cases:

	let res = fullJustify(["This", "is", "an", "example", "of", "text", "the", "justification."], 16);

	console.log(res);

	let res = fullJustify(["What","must","be","shall","be."], 12);

	console.log(res);

 */
var fullJustify = function(words, maxWidth) {
	if (!Array.isArray(words)) {
		throw new TypeError('words has to be an array');
	}

	if (typeof maxWidth !== 'number' && maxWidth > 0) {
		throw new TypeError('maxWidth has to be a number');
	}

	let res = [];
	let currLine = [];

	for(let i = 0, len = words.length; i < len;) {
		// currLen consider at least one whitespace between words
		let currLen = currLine.join(' ').length;

		if(currLen === 0 || currLen + words[i].length + 1 <= maxWidth) {
			currLine.push(words[i]);
			i++;
			continue;
		}

		res.push(currLine);
		currLine = [];
	}

	// remeber to add the last line
	if(currLine.length !== 0) {
		res.push(currLine);
	}

	// padding the line
	let lastLineIndex = res.length - 1;

	return res.map((line, index) => index !== lastLineIndex ? padLine(line, maxWidth, false) : padLine(line, maxWidth, true));
};

function padLine(line, maxWidth, leftAdjusted) {
	let slots = line.length - 1;
	let spaces = maxWidth - (line.join('').length);

	// remeber to deal with slots === 0, because we will do spaces / slots
	if (slots === 0 || leftAdjusted) {
		let res = line.join(' ');

		for(let i = 0, len = maxWidth - res.length; i < len; i++) {
			res += ' ';
		}

		return res;
	}

	// floor
	let base = Math.floor(spaces / slots);
	let extra = spaces % slots;
	let basePadding = '';

	for(let i = 0; i < base; i++) {
		basePadding += ' ';
	}

	let extraPadding = basePadding + ' ';
	let res = '';

	for(let i = 0; i < slots; i++) {
		if(extra > 0) {
			res = res + line[i] + extraPadding;
			extra--;
		} else {
			res = res + line[i] + basePadding;
		}
	}

	return res + line[line.length - 1];
}
