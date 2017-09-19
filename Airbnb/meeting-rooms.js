/*
	Logic: if all are intergers, 

	we can scan the schedules and put that in an array

	and then scan the array


	Remember:
	the end time is not included

	Test cases:

	let res = findSchedule([[[1, 3], [6, 7]],[[2, 4]],[[2, 3], [9, 12]]]);

	console.log(res);

	res = findSchedule([[[3, 4], [6, 7]],[[2, 4]],[[2, 3]], []]);

	console.log(res);

	res = findSchedule([[], [], []]);

	console.log(res);


*/
function findScheduleInIntegers(schedules) {
	let timeTable = [];

	schedules.forEach(schedules => {
		schedules.forEach(slot => {
			let start = slot[0];
			let end = slot[1] - 1; // the end time is not included

			for(let i = start; i <= end; i++) {
				timeTable[i] = true;
			}
		});
	});

	// scan timetable
	if(timeTable.length === 0) {
		return [[1, 24]];
	}

	let res = [];
	let currSlot = [];

	for(let i = 1, len = timeTable.length; i < len; i++) {
		if(timeTable[i] !== true) {
			currSlot.push(i);
		} else {
			let currSlotLen = currSlot.length;

			if(currSlotLen !== 0) {
				res.push([currSlot[0], currSlot[currSlotLen - 1] + 1]);
				currSlot = [];
			}
		}
	}

	return res;
}

function findSchedule(schedules) {
	let timeTable = [];

	schedules.forEach(schedules => {
		schedules.forEach(slot => {
			timeTable.push(slot);
		})
	});

	
	if(timeTable.length === 0) {
		return [[1, 24]];
	}

	// sort the slots
	timeTable.sort(function(a, b){
		let startDiff = a[0] - b[0];

		if(startDiff !== 0) {
			return startDiff
		} else {
			return a[1] - b[1];
		}
	})

	// scan timetable
	// There is only case
	let res = [];

	for(let i = 0, len = timeTable.length; i < len - 1; i++) {
		if(timeTable[i][1] < timeTable[i + 1][0]) {
			res.push([timeTable[i][1], timeTable[i + 1][0]]);
		} 
	}

	return res;
}
