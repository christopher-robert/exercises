/**
 * @param {character[][]} matrix
 * @return {number}
 */
 /* Test cases
	// console.log(maximalSquare(["10100","10111","11111","10010"]));
	// console.log(maximalSquare(["10100"]));
	// console.log(maximalSquare(["0"]));
	// console.log(maximalSquare(["0001","1101","1111","0111","0111"]));
	console.log(maximalSquare(["11100","11100","11111","01111","01111","01111"]));

 */
var maximalSquare = function(matrix) {
	if(!Array.isArray(matrix) || matrix.length === 0) {
		return 0;
	}

	let xLen = matrix.length;
	let yLen = matrix[0].length;
	let max = 0;
	let d = [];

	for(let i = 0; i < xLen; i++) {
		d[i] = [];
		for(let j = 0; j < yLen; j++) {
			if (matrix[i][j] === '1') {
				d[i][j] = 1;
				max = 1;
			} else {
				d[i][j] = 0;
			}
		}
	}

	for(let i = 1; i < xLen; i++) {
		for(let j = 1; j < yLen; j++) {
			if (matrix[i][j] === '1') {
				d[i][j] = Math.min(d[i - 1][j - 1], d[i - 1][j], d[i][j - 1]) + 1;
			}

			max = Math.max(max, d[i][j]);
		}
	}

	return max * max;
};
