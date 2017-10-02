/*

	This solution includes start and end

	More complex solution: http://massivealgorithms.blogspot.com/2017/07/ip2cidr-airbnb.html

*/

/*
	Test Cases:

	console.log(getCIDR("192.168.0.0", "192.168.2.0"));
	console.log(getCIDR("0.0.0.0", "255.255.255.255"));
	console.log(getCIDR("192.168.64.127", "192.168.127.0"));

*/

function ip2Val(ip) {
	let segs = ip.split('.');
	let res = new Uint32Array(1);

	segs.forEach(seg => {
		res[0] = (res[0] << 8) + Number(seg);
	});

	return res[0];
}



function getCIDR(start, end) {
	let sVal = ip2Val(start);
	let eVal = ip2Val(end);

	if(sVal > eVal) {
		return -1;
	}

	let diff = new Uint32Array(1);
	diff[0] = sVal ^ eVal;
	let cidr = 32;

	while(diff[0] !== 0) {
		diff[0] = diff[0] >>> 1;
		cidr--;
	}

	return start + '/' + cidr;
}