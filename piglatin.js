const pigIt = (str) => {
  const pigWord = (str) => {
    let arr = str.split('')
    arr.push(arr.shift())
    return arr.join('') + "ay"
    }
 return str.split(' ').map((w)=> /^[a-zA-Z]+$/.test(w) ? pigWord(w) : w).join(' ')
}
