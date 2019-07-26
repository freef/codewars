function fei (arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr.slice(0, i).reduce(((acc,val) => acc + val),0) === arr.slice(i + 1).reduce(((acc,val)=> acc + val), 0)){
            return i
        }
    }
    return -1
}

console.log(fei([1,2,3]))
