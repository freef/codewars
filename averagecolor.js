'use strict'

const averageColor = (colorA, colorB) => {
    // This helper function takes a hexidecimal string and splits it into an array of two letters.
    // the letters are then converted to an integer.
    const toRGB = (hex) => (hex.match(/.{1,2}/g).map((element) => parseInt(element,16)))
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

// the function above returns the pure mathmatical average of the RGB integer values
// however this approach will return a value that appears sigificantly darker than the expected average of two color
// this is because when displaying an color on a monitor, all values will be squared prior to display
// and the average of two square roots is less than the square root of the average.
// this function modifies the one above by calling Math.pow to square each value prior to averaging it
// afterward this function takes the square root of the average
// this method prevents the average color from appearing too dark
const displayAverage =(colorA, colorB) => {
    // This helper function takes a hexidecimal string and splits it into an array of two letters.
    // the letters are then converted to an integer.
    const toRGB = (hex) => (hex.match(/.{1,2}/g).map((element) => parseInt(element,16)))
    // convert the hexidecimal colors to RGB values
    const a = toRGB(colorB)
    const b = toRGB(colorA)
    // calculate the average color
    // square the two values to be averaged
    // then average the two squares
    // take the square root of the average
    // convert this to a hexidecimal string
    // repeat for R, G, and B, then join the values into a single string
    const average = a.map((element, index) => (Math.floor((Math.sqrt((Math.pow(element, 2) + Math.pow(b[index],2)) /2)))).toString(16)).join('')
    return average
}
