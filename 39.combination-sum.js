var combinationSum = function(candidates, target) {
    // check the type
    if(!Array.isArray(candidates)) {
        throw new TypeError('candidates has to be an array');
    }
    
    if(typeof target !== 'number') {
        throw new TypeError('target has to be a string');
    }
    
    let currSol = [];
    let res = [];
    
    recursionHelper(candidates, target, 0, currSol, res);
    
    return res;
};

function recursionHelper(candidates, target, startIndex, currSol, res) {
    if(target < 0) {
        return;
    }

    if(target === 0) {
        res.push(currSol.slice(0));
        return;
    }
    
    for(let i = startIndex, len = candidates.length; i < len; i++) {
        currSol.push(candidates[i]);
        recursionHelper(candidates, target - candidates[i], i, currSol, res);
        currSol.splice(currSol.length - 1);
    }
}