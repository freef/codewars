function permutations(string) {
  const letters = string.split('')
  let answers = []
  const combinations = (array, index = 0) => {
    const combo = array[index]
    const clone = [...array]
    clone.splice(index,1)
    return clone.map((e,i,a) => {
      const copy = [...a]
      copy.splice(i,1)
      return [combo +e, ...copy].length > 1 ? combinations([combo +e, ...copy]) : combo +e
    })
  }
  for (let i=0; i < letters.length; i++) {
    answers = [combinations(letters,i),...answers]
  }
  const flat = (arr, d = Infinity) => {
   return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flat(val, d - 1) : val), [])
                : arr.slice();
}
  answers = flat(answers).reduce((acc, value) => {
  !acc.includes(value) && acc.push(value)
  return acc
    },[])
  return letters.length < 2 ? letters : answers
}

