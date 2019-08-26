'use strict'

const averageColor = (colorA, colorB) => {
    // This helper function takes a hexidecimal string and splits it into an array of two letters.
    // the letters are then converted to an integer.
    const toRGB = (hex) => (hex.match(/.{1,2}/g).map((element) => parseInt(element.,16)))
    // call toRGB on the two hexidecimal colors to convert them to RGB values
    const a = toRGB(colorB)
    const b = toRGB(colorA)
    // calculate the mean of each Red, Blue, and Green value.
    // map with index is used to access the corresponding property in the second color
    // Math.floor ensures the retuned value is an integer.
    // toString(16) converts the number to a hex
    // the array of hex values is then joined into a string
    const average = a.map((element, index) => (Math.floor((element +b[index]) /2)).toString(16)).join('')
    //
    return average
}

module.exports = averageColor
