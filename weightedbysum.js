function orderWeight(strng) {
  const wt = (str) => str.length > 1 ? str.split('').reduce((acc,val) => parseInt(acc) + parseInt(val)) : parseInt(str)
  const sorter = (a,b) => wt(a) > wt(b) ? 1 : (wt(a) === wt(b) ? (a >= b? 1: -1) : -1)
  return strng.split(' ').sort(sorter).join(' ')
   }
