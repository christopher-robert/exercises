/**
 * @param {number} num
 * @return {string}
 */
var numberToWords = function(num) {
	if(num < 0) {
		throw new TypeError('num cannot be negative');
	}

	if(num === 0) {
		return 'Zero';
	}

	let thousandsDict = ['Thousand', 'Million', 'Billion', 'Trillion'];
	let res = [];
	let numInHundred = [];

	while(num > 0) {
		numInHundred.push(num % 1000);

		num = Math.floor(num / 1000);
	}

	for(let i = 0, len = numInHundred.length; i < len; i++) {
		let hundred = parseHundred(numInHundred[i]);

		if(hundred === '') continue;

		if(i === 0) {
			res.push(hundred);
		} else {
			res.push(thousandsDict[i - 1]);
			res.push(hundred);
		}
	}

	return res.reverse().join(' ');
};


function parseHundred(num) {
	let onesDict = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
	let tensDict = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

	if(num < 20) {
		return onesDict[num];
	}

	let res = '';
	let hundred = Math.floor(num / 100);

	if(hundred !== 0) {
		res = onesDict[hundred] + ' Hundred';
	}

	num = num - hundred * 100;

	if(num < 20) {
		return (res + ' ' + onesDict[num]).trim();
	} else {
		let ten = Math.floor(num / 10);
		let one = num - ten * 10;

		return (res + ' ' + tensDict[ten - 2] + ' ' + onesDict[one]).trim();
	}
}
