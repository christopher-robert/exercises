/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
	let head = new ListNode(null);
	let res = head;
	let p = l1;
	let q = l2;
	let carry = 0;

	while(p !== null && q !== null) {
		let sum = p.val + q.val + carry;

		carry = Math.floor(sum / 10);
		res.next = new ListNode(sum % 10);
		res = res.next;
		p = p.next;
		q = q.next;
	}

	if(p !== null) {
		while(p !== null) {
			let sum = p.val + carry;

			carry = Math.floor(sum / 10);
			res.next = new ListNode(sum % 10);
			res = res.next;
			p = p.next;
		}
	} else {
		while(q !== null) {
			let sum = q.val + carry;

			carry = Math.floor(sum / 10);
			res.next = new ListNode(sum % 10);
			res = res.next;
			q = q.next;
		}
	}

	if(carry > 0) {
		res.next = new ListNode(carry);
	}

	res = head.next;

	head.next = null;

	return res;
};
