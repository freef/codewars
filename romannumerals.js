let RomNum = class {
   
  constructor () {
    this.values = {
    'I' : 1,
    'V' : 5,
    'X' : 10,
    'L' : 50,
    'C' : 100,
    'D' : 500,
    'M' : 1000
  }
    }
  toRoman(i) {
    
    return i
  }
  fromRoman(j) {
    return j.split('').reduce((acc,val,i,arr) => Boolean(arr[i+1]) && this.values[arr[ i + 1]] > this.values[val] ? acc + (this.values[val] * -1) : acc + this.values[val], 0)
  }
}

const RomanNumerals = new RomNum
console.log(RomanNumerals.fromRoman('V'))

