function solution(list){
  const ans = []
  let sub = []
  const addVal = () => sub.length > 2 ? ans.push(sub[0].toString() + '-' + sub[sub.length-1]) : sub.forEach(e => ans.push(e.toString()))
  while (list.length > 0) {
    const v = list.shift()
    if (sub.length === 0 || sub[sub.length - 1] + 1 === v) {
      sub.push(v)
     } else {
      addVal()
      sub = []
      sub.push(v)
     }
  }
  addVal()
  return ans.join(',')
}
