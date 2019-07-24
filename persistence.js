function persistence(num, per = 0, bool = false) {
   let product = num.toString().split('').map(i => parseInt(i)).reduce((acc, val) => acc * val)
   return (product < 10) ? per + (bool=== false ? 0 : 1) : persistence(product, per + 1, true)
}

console.log(persistence(4))
console.log(persistence(999))
