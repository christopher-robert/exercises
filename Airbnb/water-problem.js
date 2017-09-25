

function waterProblem(chart, pos, vol) {
	if(!Array.isArray(chart) || chart.length <= 2) {
		return chart;
	}

	if(typeof pos !== 'number' || pos < 0 || pos > chart.length - 1) {
		return chart;
	}

	if(typeof vol !== 'number' || vol <= 0) {
		return chart;
	}


	//get the ranges
	let ranges = [];
	let i = 0;
	let len = chart.length;

	chart[len] = 0;

	while(i < len) {
		if(chart[i] > chart[i + 1]) {
			let range = {};
			
			range.start = i;

			i++;

			while(i < len && !(chart[i] > chart[i - 1] && chart[i] > chart[i + 1])) {
				i++;
			}

			if(i !== len) {
				range.end = i;
				range.max = Math.min(chart[range.start], chart[range.end]);
				ranges.push(range);
			}
		} else {
			i++;
		}
	}

	ranges.forEach(range => {
		console.log(range.start + ' ' + range.end + ' ' + range.max + ';');
	});

	if(ranges.length === 0) {
		return chart;
	}

	// fill the water

	for(let i = 0, len = ranges.length; i < len;) {
		let range = ranges[i];

		if(pos > range.end) {
			i++;
		}
	}


}