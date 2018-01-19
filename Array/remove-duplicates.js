// from sorted array

function removeDuplicates(arr) {
	if(!Array.isArray(arr) || arr.length <= 1) {
		return arr;
	}

    let len = arr.length;
    let d = 1;

    for(let i = 1; i < len; i++) {
       if(arr[i] !== arr[d - 1]) {
       		arr[d++] = arr[i];
       }
    }

    return arr.slice(0, d);
}