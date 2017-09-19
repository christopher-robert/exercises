/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
	if(!Array.isArray(lists) || lists.length === 0) {
		return null;
	}

	let right = lists.length - 1;
	let middle = Math.floor(right / 2);

	return mergeTwoLists(recursionHelper(lists, 0, middle), recursionHelper(lists, middle + 1, right));
    
};

function recursionHelper(lists, left, right) {
	if(left > right) {
		return null;
	}

	if(left === right) {
		return lists[left];
	}

	let middle = Math.floor((right + left) / 2);

	return mergeTwoLists(recursionHelper(lists, left, middle), recursionHelper(lists, middle + 1, right));
}

function mergeTwoLists(headA, headB) {
	let temp = new ListNode();
	let head = temp;

	while(headA !== null && headB !== null) {
		if(headA.val < headB.val) {
			head.next = headA;
			headA = headA.next;
			head.next.next = null;
			head = head.next;
		} else {
			head.next = headB;
			headB = headB.next;
			head.next.next = null;
			head = head.next;
		}
	}

	head.next = headA === null ? headB : headA;

	head = temp.next;
	temp.next = null;
	temp = null;

	return head;
}
