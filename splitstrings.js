let s=(str) => str.length%2? (str + '_').match(/[\s\S]{1,2}/g) : str.match(/[\s\S]{1,2}/g)
console.log(s('abcde'))
