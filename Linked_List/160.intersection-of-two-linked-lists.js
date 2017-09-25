/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */

var getIntersectionNode = function(headA, headB) {
	if(headA === null || headB === null) {
		return null;
	}

	let lenA = 0;
	let lenB = 0;
	let p = headA;

	while(p !== null) {
		lenA++;
		p = p.next;
	}

	p = headB;
	while(p !== null) {
		lenB++;
		p = p.next;
	}

	p = headA;
	let q = headB;

	if(lenA > lenB) {
		for(let i = 0, len = lenA - lenB; i < len; i++) {
			p = p.next;
		}
	} else {
		for(let i = 0, len = lenB - lenA; i < len; i++) {
			q = q.next;
		}
	}

	while(p !== null && q !== null) {
		if(p.val === q.val) {
			return p;
		}
		p = p.next;
		q = q.next;
	}

	return null;
};
