function roman(num) {
let arr = num.toString().split('').map((i, index) => parseInt(i)).reverse().map((i, index) => i * Math.pow(10, index)).reverse()
let out = arr.map((i)=> {
  let str = ''
  while (i > 0) {
     if (i >= 1000) {
      str += 'M'
      i=-1000
    } else if (i === 900) {
      str += 'DM'
      i -= 900
    } else if (i>= 500) {
      str += 'D'
      i -= 500
    } else if (i === 400) {
      str += 'CD'
      i -=400
    } else if (i >= 100) {
      str += 'C'
      i-= 100
    } else if (i === 90) {
      str += 'XC'
      i -= 90
    } else if (i >= 50) {
      str += 'L'
      i -= 50
    } else if (i === 40) {
      str += 'XL'
      i -= 40
    } else if (i >= 10) {
      str += 'X'
      i -= 10
    } else if (i === 9) {
      str += 'IX'
      i -= 9
    } else if (i >= 5) {
      str += 'V'
      i -=5
    } else if (i === 4) {
      str += 'IV'
      i-= 5
    } else if (i < 4) {
      str += 'I'
      i -= 1
    } else { return 'error'}
}
return str })
return out.join('')
}

console.log(roman(472))

// Modern Roman numerals are written by expressing each digit separately starting with the left most digit
// skipping any digit with a value of zero.
 // In Roman numerals 1990 is rendered: 1000=M, 900=CM, 90=XC; resulting in MCMXC.
  // 2008 is written as 2000=MM, 8=VIII; or MMVIII.
  // 1666 uses each Roman symbol in descending order: MDCLXVI.
