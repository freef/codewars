function narcissistic(value) {
    return value === value.toString().split('').reduce((acc,val,index,array) => Math.pow(parseInt(val), array.length) + acc ,0)
}


console.log(narcissistic(164))
