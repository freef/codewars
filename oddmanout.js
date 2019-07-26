function iqTest(str){
    let  arr = str.split(' ').map(i=> i%2)
    return arr.reduce((acc,val )=> acc+val) > 1 ? arr.indexOf(0) + 1 : arr.indexOf(1) + 1
}

console.log(iqTest('2 4 7 8 10'))
