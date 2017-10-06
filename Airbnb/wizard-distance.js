/*
	There are 10 wizards, 0-9, you are given a list that each entry is a list of wizards known by wizard. 
	Define the cost between wizards and wizard as square of different of i and j. 
	To find the min cost between 0 and 9
*/

/*
	let wizards = [
		[1, 2],
		[2, 3],
		[3],
		[]
	];

	console.log(getMinWizardDistance(wizards));
*/


function getMinWizardDistance(list) {
	if(!Array.isArray(list) || list.length === 0) {
		return - 1;
	}

	let vertices = {};

	list.forEach((relationships, index) => {
		vertices[index] = {
			val: index,
			edges: relationships,
			weight: index === 0 ? 0 : Infinity
		};
	});

	let queue = [vertices[0]];
	let len = 1;

	while(queue.length !== 0) {
		let nextLen = 0;

		for(let i = 0; i < len; i++) {
			let vertex = queue.shift();

			vertex.edges.forEach(child => {
				let toVertex = vertices[child];

				toVertex.weight = Math.min(toVertex.weight, vertex.weight + (child - vertex.val) * (child - vertex.val));
				queue.push(toVertex);
				nextLen++;
			});

			len = nextLen;
		} 
	}

	return vertices[list.length - 1].weight;
}
