function persistence(num, per = 0) {
  if (num < 10) {
    return per
  } else {
   per++
   let product = num.toString().split('').map(i => parseInt(i)).reduce((acc, val) => acc * val)
   return (product < 10) ? per : persistence(product, per)
 }
}

console.log(persistence(7))
console.log(persistence(14))
console.log(persistence(700))
