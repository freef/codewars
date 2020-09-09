const solution = (input, markers) => input.replace(new RegExp(`(\\s*?[${markers.join('')}].*?)$`,'gm'),'')
