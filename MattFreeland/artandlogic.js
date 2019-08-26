'use strict'

const fs = require('fs') // library to access the file system
const input = process.argv[2]
const addOn = process.argv[3]

const hexEncodeFromFile = (input = false, append = false) => {
    // create endocer function
    const appendFile = append ? fs.appendFile : fs.writeFile
    const hexEncoder = (stringInt) => {
        if (stringInt > 8191 || stringInt < -8192) {return 'ERROR'}
        const adjusted = parseInt(stringInt) + 8192 // make the set positive
        const lowBit = adjusted &  0x007F // create a set mask for lower byte
        const highBit = adjusted & 0x3F80 // create a set mask for high byte
        // combine the bits into an integer use '<<' to shift the high bit then convert to hex
        return (lowBit + (highBit << 1)).toString(16).padStart(4,'0')
    }

    // create decoder function
    // do it encode operations in reverse remember that inputs are two digit numbers (like in a buffer)
    const hexDecoder = (high, low) => {
        const lowBit = parseInt(low, 16)
        const highBit = parseInt(high, 16)
        const adjusted = lowBit + (highBit << 7)
        return (adjusted - 8192)
    }

    // determine data type and read/write files
    if(input==='enc') {
        fs.promises.readFile('./InputData.txt', 'utf8')
            .then(data => (data.split(' ').map(value => hexEncoder(value.trim()))))
            .then(data => appendFile('ConvertedData.txt', (data.join(' ') + ' '), (err) => {
                if (err) throw err
                console.log('data encoded to ConvertedData.txt')
            }))
            .catch(console.log)

    } else if( input==='dec') {
        fs.promises.readFile('./InputData.txt', 'utf8')
            .then(data => (data.split(' ').map(value => {
                const fixedVal = value.trim()
                const hexRegex = /^[0-9a-fA-F]+$/
                if (hexRegex.test(fixedVal) && fixedVal.length === 4){
                    return hexDecoder(fixedVal.slice(0,2),fixedVal.slice(2,4))
                } else {return 'ERROR'}
            })))
            .then(data => appendFile('ConvertedData.txt', (data.join(' ') + ' '), (err) => {
                if (err) throw err
                console.log('data decoded to ConvertedData.txt')
            }))
            .catch(console.log)
    } else {
        throw 'You must specify either "enc" to encode integers or "dec" to decode hexidecimal integers as a command line argument after the file path.'
    }
}

hexEncodeFromFile(input, addOn)
