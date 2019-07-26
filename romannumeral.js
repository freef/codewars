function roman(num) {
// let arr = num.toString().split('').map((num, index) => parseInt(num)).reverse().map((num, index) => num * Math.pow(10, index)).reverse()
// let out = arr.map((num)=> {
    let str = ""
    while (num > 0) {
        if ( num >= 1000) {
            str += "M"
            num -= 1000
            console.log(num)
        } else if (num >= 900) {
            str += "CM"
            num -= 900
        } else if (num>= 500) {
            str += "D"
            num -= 500
        } else if (num >= 400) {
            str += "CD"
            num -=400
        } else if (num >= 100) {
            str += "C"
            num-= 100
        } else if (num >= 90) {
            str += "XC"
            num -= 90
        } else if (num >= 50) {
            str += "L"
            num -= 50
        } else if (num >= 40) {
            str += "XL"
            num -= 40
        } else if (num >= 10) {
            str += "X"
            num -= 10
        } else if (num >= 9) {
            str += "IX"
            num -= 9
        } else if (num >= 5) {
            str += "V"
            num -=5
        } else if (num >= 4) {
            str += "IV"
            num-= 5
        } else if (num < 4) {
            str += "I"
            num -= 1
        }
    }
    return str }


console.log(roman(2472))

// Modern Roman numerals are written by expressing each digit separately starting with the left most digit
// skipping any digit with a value of zero.
// In Roman numerals 1990 is rendered: 1000=M, 900=CM, 90=XC; resulting in MCMXC.
// 2008 is written as 2000=MM, 8=VIII; or MMVIII.
// 1666 uses each Roman symbol in descending order: MDCLXVI.
