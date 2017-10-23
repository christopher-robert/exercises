/*
	new Promise(resolve => {
		resolve(guessNumber())
	}).then(res => {
		console.log(res);
	});

*/


function getResponse(guess) {
	let url = 'http://localhost:4500/api/guess';

	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();

		xhr.onload = function () {
	        resolve(JSON.parse(xhr.responseText));
	    }

	    xhr.open('GET', url + '?num=' + guess);
	    xhr.send(null);
	});
}

async function guessNumber() {
	let res  = [];
	let firstGuess = [1, 1, 1, 1];
	let firstResponse = await getResponse(firstGuess.join('')).then(res => res);

	let counter = 1;

	for(let i = 0; i < 4; i++) {
		let response = firstResponse;
		let guess = firstGuess.slice(0);
		let j = 1;
		
		// check the bulls
		while(j < 6 && response[0] !== firstResponse[0] + 1) {
			guess[i]++;

			response = await getResponse(guess.join('')).then(res => res);

			counter++;
			j++;
		}

		// bulls never change, then 1 is matched
		if(response[0] !== firstResponse[0] + 1) {
			res.push(1);
		} else {
			res.push(guess[i]);
		}
	}

	console.log(counter);

	return res.join('');
}
