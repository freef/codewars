'use strict'
const fs = require('fs') // library to access the file system
const addOn = process.argv[2]

const hexEncodeFromFile = (append = false) => {
   // flag to append existing file or overwrite data
   const appendFile = append ? fs.appendFile : fs.writeFile
   // decoder function
   const hexDecoder = (val) => {
      const high = val.slice(0,2)
      const low = val.slice(2,4)
      const lowBit = parseInt(low, 16)
      const highBit = parseInt(high, 16)
      const adjusted = lowBit + (highBit << 7)
      return (adjusted - 8192)
   }
   // a function to determine if a two digit hex is a Command or a value
   // Commands are replaced with their string value i.e. PEN
   const isCommand = (hex) => {
      const commands = {
         CLR: 'F0',
         PEN: '80',
         CO: 'A0',
         MV: 'C0'
      }
      const key = Object.keys(commands).find(key => commands[key]=== hex)
      return key ? key : parseInt(hex) > 80 ? 'ERR' : false
   }
   // take the file from the string and split it into commands and values
   // values are 4 characters long, and strings are their arbitrary length
   const formatInput = (data) => {
      const fixedData = data.trim()
      let dataArray = []
      for (let i =0; i < fixedData.length; i ++) {
         const bit = isCommand(fixedData.substring(i,i+2))
         bit ? dataArray.push(bit) : dataArray.push(fixedData.substring(i, i+4))
         bit ? i += 1 : i += 3
      }
      dataArray = dataArray.map(val => {
         const hexRegex = /^[0-9a-fA-F]+$/
         if (hexRegex.test(val) && val.length === 4){
            return val.length === 4 ? hexDecoder(val) : val
         } else {return val}
      })
      return dataArray
   }

   // this function returns the final formatted output text
   const formatOutput = (arr) => {
      // output is the total output
      let output = ''
      // coordinates constructs and formats the coordiante pairs when performing a move operation
      let coordinates = ''
      // Color, xLocation, yLocation, & draw are variables that that track the current status of the program
      let color = '0,0,0,255'
      let xLocation = 0
      let yLocation = 0
      let draw = false
      // nextPosition calculates the next coordiante pair indicating the PEN location
      // this function also returns the commands for the drawings
      // these are vital for providing the correct conditional outputs
      const nextPosition = (xInput, yInput) => {
         // calculate next x and y points from the relative input values
         const xPosition = xLocation + xInput
         const yPosition = yLocation + yInput
         // determine if the beginning and end of the line are within the drawing area
         const startInBounds = xLocation <= 8191 && xLocation >=-8192 && yLocation <= 8191 && yLocation >=-8192
         const endInBounds = xPosition <= 8191 && xPosition >=-8192 && yPosition <= 8191 && yPosition >=-8192
         // get the slope & y intercept of the line in order to calculate where the line intersects with the edges of the drawing
         // these calculations give us the new line values in y=mx+b form
         const slope = (yLocation - yPosition)/(xLocation - xPosition)
         const yintercept = yPosition-(slope * xPosition) // when x is zero
         // calculate where the line intercepts the various boundaries of the drawing area
         // the variables below calculate four coordinate value pairs where the x and y values are the edge of the drawing
         const maxXBound = Math.round(slope*8191 + yintercept) // y coordianate for maximum x value
         const maxYBound = Math.round((8191-yintercept)/slope) // x coordianate for maximum y value
         const minXBound = Math.round(slope* -8192 + yintercept) // y coordianate for minimum x value
         const minYBound = Math.round((-8192-yintercept)/slope) // x coordianate for maximum y value
         // this program graphs a line between two points.
         // If the start or end of the line is outside the drawing border only one of the four border points should fall between the starting location and ending location
         const possibleEdgePoints = [[8191, maxXBound],[maxYBound,8191],[-8192, minXBound,],[minYBound,-8192]]
         const pairValidityChecker = (acc, arr) => {
            const xvalue = arr[0] < xLocation && arr[0] < xPosition || arr[0] > xLocation && arr[0] > xPosition ? false : arr[0]
            const yvalue = arr[1] < yLocation && arr[1] < yPosition || arr[1] > yLocation && arr[1] > yPosition ? false : arr[1]
            acc = xvalue && yvalue ? [xvalue, yvalue] : acc
            return acc
         }
         const singleValidPair = possibleEdgePoints.reduce(pairValidityChecker)
         // conditions for possible line paths
         if (startInBounds) {
            if (endInBounds){
               // start & end in bounds, just plot the line
               coordinates += `(${xPosition}, ${yPosition})`
            } else {
               // lift up the pen if the line exits the canvas
               coordinates += `(${singleValidPair[0]}, ${singleValidPair[1]})${draw === true? ';\nPEN UP;\n' : ' '}`
            }
         } else {
            if(endInBounds) {
               // if the line starts out bounds and ends inbounds, begin drawing when the pen enters the canvas
               const adjust = draw ? `MV (${singleValidPair[0]}, ${singleValidPair[1]});\nPEN DOWN;\nMV` : ''
               coordinates += `${adjust} (${xPosition}, ${yPosition})`
            } else {
               // if the line starts and ends outside of the bounding box it is still possible to draw a valid line
               // in this case there will be an intersection point at both the x limit and the y limit
               // this function calculates those two pairs and graphs them if they're both valid
               const xValidPair = [[8191, maxXBound],[-8192, minXBound]].reduce(pairValidityChecker)
               const yValidPair = [[maxYBound,8191],[minYBound,-8192]].reduce(pairValidityChecker)
               const passThrough = xValidPair && yValidPair
               const adjust = draw && passThrough ? `MV (${xValidPair[0]}, ${xValidPair[1]});\nPEN DOWN;\nMV (${yValidPair[0]}, ${yValidPair,[1]});\nPEN UP;\n` : ''
               coordinates += `${adjust} (${xPosition}, ${yPosition})`
            }
         }
         // finally update the current pen location to the next pen position
         xLocation = xPosition
         yLocation = yPosition
      }

      // loop through the array to process each. each command and input have particular formatting rules
      // the for loop is preferable to the for each method because a for loop can work with multiple elements at a time
      for (let i=0; i < arr.length; i++) {
         switch (arr[i]) {
         // format the Clear commands and conditionally send additional commands to update location and color
         case 'CLR' :
            output += 'CLR;\n' + (color=== '0,0,0,255' ? '' : 'CO 0 0 0 255;\n') + (draw === false ? '' : 'PEN UP;\n') + (xLocation ===0 && yLocation === 0 ? '' : 'MV (0, 0);\n' )
            color = '0,0,0,255'
            xLocation = 0
            yLocation = 0
            draw = false
            break
         // lift up or put down the pen
         case 'PEN':
            output += draw === false ? arr[i+1] === 0 ? '' : 'PEN DOWN\n' : arr[i+1]!==0 ? '' : 'PEN UP;\n'
            draw = (arr[i+1] === 0) ? false : true
            i += 1
            break
         // format the color change command and the four required values
         case 'CO':
            output += `CO ${arr[i+1]} ${arr[i+2]} ${arr[i+3]} ${arr[i+4]};\n`
            color = `${arr[i+1], arr[i+2], arr[i+3], arr[i+4]}`
            i+=4
            break
         case 'MV':
            // clear the input for the previous move command
            coordinates = ''
            // move takes an arbitrary number of inputs
            // this loop finds each input pair and processes it
            // note, this loop uses the same i iterator as the previous for loop
            for (i; i < arr.length; i++){
               if (!Number.isInteger(arr[(i+1)])){
                  break
               } else {
                  nextPosition(arr[i+1],arr[i+2], i)
                  // increment an additional time to account for the second value in the ordered pair
                  i+=1
               }
            }
            output += `MV ${coordinates};\n`
            break
         // if the command is unrecognized, do nothing
         default : ''
         }
      }
      // return the human readable string for all input commands
      return output
   }

   fs.promises.readFile('./InputData.txt', 'utf8')
      .then(formatInput)
      .then(formatOutput)
      .then(data => appendFile('ConvertedData.txt', (data), (err) => {
         if (err) throw err
         console.log('data decoded to ConvertedData.txt')
      }))
      .catch(console.log)
}

hexEncodeFromFile(addOn)
