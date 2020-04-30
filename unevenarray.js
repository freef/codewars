function findOdd(a) {
  const u = [... new Set(a)]
  const i = u.map(val => {
   let count = 0
   a.forEach(v => v===val && count++)
   return count % 2
  }).indexOf(1)
  return u[i]
}
