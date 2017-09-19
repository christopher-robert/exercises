/*
	John,Smith,john.smith@gmail.com,Los Angeles,1
	Jane,Roberts,janer@msn.com,"San Francisco, CA",0
	"Alexandra ""Alex""",Menendez,alex.menendez@gmail.com,Miami,1
	"""Alexandra Alex"""
	
	John|Smith|john.smith@gmail.com|Los Angeles|1
	Jane|Roberts|janer@msn.com|San Francisco, CA|0
	Alexandra "Alex"|Menendez|alex.menendez@gmail.com|Miami|1
	"Alexandra Alex"

	Test cases: 
		let res = parseCSV('John,Smith,john.smith@gmail.com,Los Angeles,1\nJane,Roberts,janer@msn.com,"San Francisco, CA",0\n"Alexandra ""Alex""",Menendez,alex.menendez@gmail.com,Miami,1\n"""Alexandra Alex"""');

		console.log(res);

		res = parseCSV('""Alexandra """Alex"""",B');

		console.log(res);

		res = parseCSV('"Alexandra ""Alex""",B');

		console.log(res);

		res = parseCSV('"Alexandra "Alex"",B');

		console.log(res);

		res = parseCSV('"Alexandra Alex",B');

		console.log(res);
*/

function parseCSV(source) {
	if(typeof source !== 'string') {
		throw new TypeError('source needs to be a string');
	}

	let word = [];
	let line = [];
	let res = [];

	let inQuote = false;

	for(let i = 0, len = source.length; i < len; i++) {
		if(inQuote) {
			if(source[i] === '"') {
				// always ignore the last two  "
				// "Alexandra "Alex"",B
				// "Alexandra ""Alex""", B
				if(i + 2 >= len || source[i + 2] === ',') {
					inQuote = false;
					i++;
					continue;
				}

				if(source[i + 1] === '"') {
					word.push('"');
				}
			} else {
				word.push(source[i]);
			}
		} else {
			if(source[i] === '"') {
				// always ignore the first "
				inQuote = true;
				continue;
			}

			if(source[i] === ',') {
				// push word to the line
				line.push(word.join(''));
				word = [];
				continue;
			}

			if(source[i] === '\n') {
				// push the word first
				line.push(word.join(''));
				word = [];
				// push line to the final string
				res.push(line.join('|'));
				line = [];
				continue;
			}
			
			word.push(source[i]);
		}
	}

	//push last line
	if(word.length !== 0) {
		line.push(word.join(''));
	}
	if(line.length !== 0) {
		res.push(line.join('|'));
	}

	return res.join('\n');
}

/*
给定一个CSV文件，格式是 “some_name|some_address|some_phone|some_job”
要求输出Json format “{name:some_name, address:some_addres,phone:some_phone, job:some_job}”
*/