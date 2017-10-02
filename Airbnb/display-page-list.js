/*

给了以下一些输入数据，要求将以下行分页显示，
每页12行，其中每行已经按score排好序，分页显示的时候如果有相同host id的行，则将后面同host id的行移到下一页

"host_id,listing_id,score,city",
[
"1,28,300.1,SanFrancisco",
"4,5,209.1,SanFrancisco",
"20,7,208.1,SanFrancisco",
"23,8,207.1,SanFrancisco",
"16,10,206.1,Oakland",
"1,16,205.1,SanFrancisco",
"6,29,204.1,SanFrancisco",
"7,20,203.1,SanFrancisco",
"8,21,202.1,SanFrancisco",
"2,18,201.1,SanFrancisco",
"2,30,200.1,SanFrancisco",
"15,27,109.1,Oakland",
"10,13,108.1,Oakland",
"11,26,107.1,Oakland"
]


*/

function getPages(list) {
	if(!Array.isArray(list) || list.length <= 12) {
		return list;
	}

	list = list.map(listing => listing.split(','));

	let pages = [];

	while(list.length > 0) {
		let map = {};
		let extras = [];
		let page = [];

		while(page.length < 12 && list.length > 0) {
			let listing = list.shift();

			if(map[listing[0]]) {
				extras.push(listing);
			} else {
				map[listing[0]] = true;
				page.push(listing.join(','));
			}
		}

		pages.push(page);

		for(let i = extras.length - 1; i >= 0; i--) {
			list.unshift(extras[i]);
		}
	}

	return pages;
}
