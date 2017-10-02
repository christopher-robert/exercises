/*

你的wishlist是 a,b,c,d
buddy1 的wishlist 是 a,b,e,f, 有两个和你的一样，所以是你的buddy
buddy2 的wishlist 是 a,c,d,g, 有三个和你的一样，也是你的budy

你和你的兄弟都有一个wishlist，找出和你相似度最高的

*/

/*
	Test cases:

	let yours = ['a','b', 'c', 'd'];
	let buddies = [
		['a', 'b', 'e', 'f'],
		['a', 'c', 'd', 'g'],
		['a', 'c', 'd', 'd', 'e', 'f'],
		['a'],
		['f', 'g']
	];

	console.log(getRecommendations(yours, buddies, 10));
	console.log(getRecommendations(yours, buddies, 2));
	console.log(getRecommendations(yours, buddies, 1));

*/


function getBuddyList(yours, buddies) {
	// check the type

	// build the hash map
	let hashMap = {};

	yours.forEach(city => {
		hashMap[city] = true;
	});

	// get the buddy list
	let buddiesList = [];

	buddies.forEach((wishlist, index) => {
		let matches = 0;

		let buddy = {
			name: index,
			remains: [],
			matches: 0
		};

		wishlist.forEach(city => {
			if(hashMap[city]) {
				buddy.matches++;
			} else {
				buddy.remains.push(city);
			}
		});

		buddiesList.push(buddy);
	});

	buddiesList.sort((a, b) => b.matches - a.matches);

	return buddiesList;
}

/* Follow Up

输出一个size最多为max的推荐城市列表。
当size为10时，buddy1和buddy2的wishlist中不在你的wishlist中的城市都可以加入推荐中，
因为buddy2的重合度更高，所以先输出buddy2中的，所以推荐为 g,e,f 当size为2时，推荐是g,e 或 g,f

*/

function getRecommendations(yours, buddies, size) {
	let buddiesList = getBuddyList(yours, buddies);
	let res = {};

	for(let i = 0, len = buddiesList.length; i < len && size > 0; i++) {
		let candidates = buddiesList[i].remains;

		for(let j = 0, jLen = candidates.length; j < jLen && size > 0; j++){
			if(res[candidates[j]] === undefined) {
				res[candidates[j]] = true;
				size--;
			}
		}
	}

	return Object.keys(res);
}
