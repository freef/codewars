function add(a, b) {
  // the issue is js can't deal with numbers over a certain size reliably
  // create arrays of the same length where each digit is its own item
  // add one additional zero to handle the possible last digit
if (a.length > b.length) {
  a = ('0' + a).split('')
  b = ('0'.repeat(a.length - b.length) + b).split('')
} else if (b.length > a.length) {
  b = ('0' + b).split('')
  a = ('0'.repeat(b.length - a.length) + a).split('')
} else {
  a = ('0' + a).split('')
  b = ('0' + b).split('')
}
  // c is the answer index
let c = '0'.repeat(a.length).split('')

// loop through and add each digit
for (let i= a.length -1 ; i >= 0; i--) {
  c[i] = parseInt(a[i]) + parseInt(b[i]) + parseInt(c[i])
  // if two numbers sum is 10 or more, move the 1 to the next digit
  if (c[i] > 9) {
    c[i] = parseInt(c[i]) - 10
    c[i-1] = 1
  }
}
  c = c
  if (c[0] == 0) {c.shift()}
  return c.join('')
}
