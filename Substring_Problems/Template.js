function findSubstring(str){

  let map = {}:
  let counter; // check whether the substring is valid
  let slow=0, fast=0; //two pointers, one point to tail and one  head
  let res; // the result string

  for() { /* initialize the hash map here */ }

  while(fast < str.size()){
    if(map[str[fast]] ? /*modify the condition here*/) { 
        /* modify counter here */
    }
    map[str[fast]]--; // or ++
    fast++;

    while(/* counter condition */){ 
         /* update res here if finding minimum*/

         /* update res to find maximum*/

        //increase slow to make it invalid/valid again
        
        if(map[str[slow]] ? /*modify the condition here*/) {
         /*modify counter here*/ 
        }
        map[str[beigin]]++; // or --
        slow++;
    }  

  }

  /* DO NOT forget to verify the remaining string (fast - slow) update d here if finding maximum*/

  return d;
}