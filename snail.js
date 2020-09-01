snail = function(array) {
  // answer array
  let ans = []
  // loop continually cralws outside of a matrix
  // method is destructive and each loop removes the outside elements
  while (array.length>0) {
    // sets the width of the matrix - must be set outside of loop to prevent premature termination
    let sq = array[0].length
    // adds top row to solutions
    for(let i=0; i<sq; i++) {ans.push(array[0].shift())}
    // adds right sides except top & bottom corners
    for(let i=1; i<array.length-1; i++) {ans.push(array[i].pop())}
    // adds bottom values and removes bottom row
    ans = ans.concat(array.pop().reverse())
    // adds left sides except top
    for(let i=array.length-1; i>0; i--) {ans.push(array[i].shift())}
    // removes top row
    array.shift()
    }
  return(ans)
}
