

function decode(source) {
	if(source.length === 1) {
		return source[0];
	}

	let res = [];
	let matrix = [];

	source.forEach(row => {
		matrix.push(row.split(''));
	});

	let iLen = matrix.length;
	let jLen = matrix[0].length;

	let i = -2;
	let j = 0;

	while(i < iLen && j < jLen) {
		i = i + 2;
		while(i < iLen && j < jLen) {
			res.push(matrix[i][j]);
			i++;
			j++;
		}

		if(j < jLen) {
			i = i - 2;
			while(i >= 0 && j < jLen) {
				res.push(matrix[i][j]);
				i--;
				j++;
			}
		}
	}

	return res.join('');
}