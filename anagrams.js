const anagrams = (word, words) => {
  const solution = []
  words.forEach((item)=> item.split('').sort().join('') === word.split('').sort().join('') && solution.push(item))
  return solution
}
