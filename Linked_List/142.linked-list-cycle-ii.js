/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */

 /*
	When fast and slow meets: 
	fast travelled 2D
	slow travelled D

	2D - D = the length of the cycle

	move the head and slow until they meet at the point
 */
 
var detectCycle = function(head) {
	if(!(head instanceof ListNode)){
		return null;
	}

	let slow = head;
	let fast = head;

	while(fast !== null && fast.next !== null) {
		slow = slow.next;
		fast = fast.next.next;

		if(slow === fast) {
			fast = head;

			while(slow !== fast) {
				fast = fast.next;
				slow = slow.next;
			}

			return slow;
		}
	}

	return null;
};