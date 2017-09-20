/**
 * @param {number} capacity
 */

 /*
	double linked list + hashmap

 */
var LRUCache = function(capacity) {
	this.capacity = capacity;

	let hash = {};
	let head = {
		next: null
	};
	let tail = null;
	let size = 0;

	return this;
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
	if(hash[key] === undefined) {
		return -1;
	} else {
		let value = hash[key].value

		hash[key]

	}
    
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = Object.create(LRUCache).createNew(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */