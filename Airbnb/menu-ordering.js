/*
	let menu = [
		{
			item: 'Egg',
			price: '2.12'
		},
		{
			item: 'Waffle',
			price: '5.55'
		},
		{
			item: 'Coffee',
			price: '2.55'
		},
		{
			item: 'Bacon',
			price: '2.55'
		}
	];

	let money = 2.12;
	let res = getExactAmountOrder(menu, money);

		console.log(res);

		money = 2.12 * 2;
	res = getExactAmountOrder(menu, money);

		console.log(res);


		money = 2.12 + 2.55;
	res = getExactAmountOrder(menu, money);

		console.log(res);

*/


function getExactAmountOrder(menu, money) {
	if(!Array.isArray(menu)) {
		throw new Error('menu should be an array');
	}

	let sum = Number(money);
	let res = [];
	let currSol = [];

	recursionHelper(menu, sum, 0, currSol, res);

	return res;
}

function recursionHelper(menu, sum, startIndex, currSol, res) {
	if(sum < 0) {
		return;
	}

	if(sum === 0) {
		res.push(currSol.map(menuItem => menuItem.item));
		return;
	}

	for(let i = startIndex, len = menu.length; i < len; i++) {
		currSol.push(menu[i]);
		recursionHelper(menu, sum - Number(menu[i].price), i, currSol, res);
		currSol.splice(currSol.length - 1);
	}
}
