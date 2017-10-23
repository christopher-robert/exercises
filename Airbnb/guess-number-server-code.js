function getRandomInteger() {
	let low = 1;
	let high = 6;
	
	return Math.floor(Math.random() * (high - low + 1)) + low;
}

function generateNumber() {
	let num = [];

	for(let i = 0; i < 4; i++) {
		num[i] = getRandomInteger();
	}

	return num.join('');
}

function serverCheck(newNum) {
	let newNums = newNum.split('');
	let oldNums = oldNum.split('');
	let res = [0, 0];

	for(let i = 0; i < 4; i++) {
		if(newNums[i] === oldNums[i]) {
			res[0]++;
			newNums[i] = null;
			oldNums[i] = null;
		}
	}

	for(let i = 0; i < 4; i++) {
		for(let j = 0; j < 4; j++) {
			if(newNums[i] !== null && newNums[i] === oldNums[j]) {
				res[1]++;
				oldNums[j] = null;
				break;
			}
		}
	}

	return res;
}

var oldNum = generateNumber();


var express = require('express');
var url = require('url');

// api
var app = express();

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	next();
});

app.get('/api/',function(req,res) {
	res.send('Working');
});

app.get('/api/guess', function(req,res) {
	var url_parts = url.parse(req.url, true);

	console.log(oldNum);
	console.log(url_parts.query.num);

	res.send(serverCheck(url_parts.query.num));
});

app.listen('4500');
