/*
	Drop water one by one:

	Go to left first and then go right

*/

/*
	Test cases:

	let heights = [3, 2, 1, 2];
	
	console.log(waterLand(heights, 1, 1));

	heights = [5, 3, 1, 4, 3, 2, 1, 5];

	console.log(waterLand(heights, 1, 7));
*/

function waterLand(heights, position, count) {
	let water = [];
	let len = heights.length;


	for(let i = 0; i < len; i++) {
		water[i] = 0;
	}


	while(count > 0) {
		let left = position;
		let right = position;
		let putPosition = position;


		while(left >= 1) {
			if(heights[left - 1] + water[left - 1] > heights[left] + water[left]) break;
			left--;
		}

		if(heights[left] + water[left] < heights[position] + water[position]) {
			putPosition = left;
		} else {
			while(right <=  len - 2) {
				if(heights[right + 1] + water[right + 1] > heights[right] + water[right]) break;
				right++;
				
			}
			if(heights[right] + water[right] < heights[position] + water[position]) {
				putPosition = right;
			}

		}

		water[putPosition]++;
		count--;
	}

	// print the graph from top to down
	let maxHeight = 0;

	for(let i = 0; i < len; i++) {
		maxHeight = Math.max(maxHeight, heights[i] + water[i]);
	}

	let res = '';

	for(let i = maxHeight; maxHeight > 0; maxHeight--) {
		let level = '';

		for(let j = 0; j < len; j++) {
			if(heights[j] + water[j] < maxHeight) {
				level += ' ';
			} else if(heights[j] >= maxHeight) {
				level += '*';
			}  else {
				level += 'w';
			}
		}

		res += level + '\n';
	}

	return res;
}
