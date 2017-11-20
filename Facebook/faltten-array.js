

function flattenArray(arr) {
	let res = [];

	arr.forEach(item => {
		if(Array.isArray(item)) {
			res = res.concat(flattenArray(item));
		} else {
			res.push(item);
		}
	});

	return res;
}


function flatternArrayIterative(arr) {
	let res = [];

	while(arr.length > 0) {
		let item = arr.shift();

		if(Array.isArray(item)) {
			arr = item.concat(arr);
		} else {
			res.res.push(arr);
		}
	}

	return res;
}