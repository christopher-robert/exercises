/**
 * @param {number[][]} buildings
 * @return {number[][]}
 */

/* two much memeory version
var getSkyline = function(buildings) {
	// check the type

	if(!Array.isArray(buildings) || buildings.length === 0) {
		return [];
	}

	buildings.sort((a, b) => {
		return a[0] - b[0];
	});

	let xAxis = [];

	for(let i = 0, len = buildings[buildings.length - 1][1] + 1; i <= len; i++) {
		xAxis[i] = [0];
	}


	for(let i = 0, len = buildings.length; i < len; i++) {
		let b = buildings[i];

		for(let j = b[0]; j <= b[1]; j++) {
			xAxis[j].push(b[2]);
		}
	}

	xAxis = xAxis.map(x => getMax(x));

	let res = [];

	if(xAxis[0] > 0) {
		res.push([0, xAxis[0]]);
	}

	for(let i = 1, len = xAxis.length; i < len; i++) {
		if(xAxis[i - 1] < xAxis[i]) {
			res.push([i, xAxis[i]]);
		}

		if(xAxis[i] > xAxis[i + 1]) {
			res.push([i, xAxis[i + 1]]);
		}

	}

	return res;
};

function getMax(arr) {
	return arr.reduce((pre, curr, index) => {
		return Math.max(pre, curr);
	}, arr[0]);
}
*/

var getSkyline = function(buildings) {
	// check the type

	if(!Array.isArray(buildings) || buildings.length === 0) {
		return [];
	}

	buildings.sort((a, b) => {
		return a[0] - b[0];
	});

	let xAxis = [];

	for(let i = 0, len = buildings.length; i < len; i++) {
		let b = buildings[i];

		x[b[0]].push(b[2]);
		x[b[1]].push(b[2]);

		for


		for(let j = i - 1; j <= b[1]; j++) {
			xAxis[j].push(b[2]);
		}
	}

	xAxis = xAxis.map(x => getMax(x));

	let res = [];

	if(xAxis[0] > 0) {
		res.push([0, xAxis[0]]);
	}

	for(let i = 1, len = xAxis.length; i < len; i++) {
		if(xAxis[i - 1] < xAxis[i]) {
			res.push([i, xAxis[i]]);
		}

		if(xAxis[i] > xAxis[i + 1]) {
			res.push([i, xAxis[i + 1]]);
		}

	}

	return res;
};

function getMax(arr) {
	return arr.reduce((pre, curr, index) => {
		return Math.max(pre, curr);
	}, arr[0]);
}
