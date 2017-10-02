/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function(n) {
    if(n === 0) {
        return 0;
    }
    
    let res = new Uint32Array(1);

    res[0] = 0;
    
    for(let i = 0; i < 32; i++) {
        res[0] = res[0] << 1;
        
        if(n & 1 === 1) {
            res[0]++;
        }
        
        n = n >> 1;
    }
    
    return res[0];
};