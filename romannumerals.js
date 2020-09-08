let RomNum = class {
   
  constructor () {
    this.values = {
      'M' : 1000,
      'CM': 900,
      'D' : 500,
      'CD': 400,
      'C' : 100,
      'XC': 90,
      'L' : 50,
      'XL': 40,
      'X' : 10,
      'IX': 9,
      'V' : 5,
      'IV': 4,
      'I' : 1 
  }
    }
  toRoman(i) {
    let num = i
    let str = ''
    Object.entries(this.values).forEach(e => {
      while (e[1] <= num) { 
        str+=e[0]
        num-=e[1]
  }
})
    return str
  }
  fromRoman(j) {
    return j.split('').reduce((acc,val,i,arr) => Boolean(arr[i+1]) && this.values[arr[ i + 1]] > this.values[val] ? acc + (this.values[val] * -1) : acc + this.values[val], 0)
  }
}

const RomanNumerals = new RomNum
console.log(RomanNumerals.fromRoman('V'))

