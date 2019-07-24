function persistence(num, per = 1) {
   let product = num.toString().split('').map(i => parseInt(i)).reduce((acc, val) => acc * val)
   return (product < 10) ? per : persistence(product, per + 1)
}

console.log(persistence(999))
