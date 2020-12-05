const fs = require("fs");
const filename = "./passes.txt";
const input = fs.readFileSync(filename, "utf8").split("\n");

function highestSeatId (list) {
    let highestId = 0
    list.forEach(pass => {
        let index = 0
        let row, column
        let rowRange = [0, 127]
        let columnRange = [0, 7]
        while (index < pass.length) {
            if (pass[index] === 'F') {
                if (index === 6) {
                    row = rowRange[0]
                } else {
                    rowRange[1] = Math.floor((rowRange[0] + rowRange[1]) / 2)
                }
            }
            if (pass[index] === 'B') {
                if (index === 6) {
                    row = rowRange[1]
                } else {
                    rowRange[0] = Math.ceil((rowRange[0] + rowRange[1]) / 2)
                }
            }
            if (pass[index] === 'R') {
                if (index === 9) {
                    column = columnRange[1]
                } else {
                    columnRange[0] = Math.ceil((columnRange[0] + columnRange[1]) / 2)
                }
            }
            if (pass[index] === 'L') {
                if (index === 9) {
                    column = columnRange[0]
                } else {
                    columnRange[1] = Math.floor((columnRange[0] + columnRange[1]) / 2)
                }
            }
            index++
        }
        if ((row * 8 + column) > highestId) {
            highestId = (row * 8 + column)
        }
    })
    return highestId
}

function findSeatId (list) {
    const seatIds = list.map(pass => {
        let index = 0
        let row, column
        let rowRange = [0, 127]
        let columnRange = [0, 7]
        while (index < pass.length) {
            if (pass[index] === 'F') {
                if (index === 6) {
                    row = rowRange[0]
                } else {
                    rowRange[1] = Math.floor((rowRange[0] + rowRange[1]) / 2)
                }
            }
            if (pass[index] === 'B') {
                if (index === 6) {
                    row = rowRange[1]
                } else {
                    rowRange[0] = Math.ceil((rowRange[0] + rowRange[1]) / 2)
                }
            }
            if (pass[index] === 'R') {
                if (index === 9) {
                    column = columnRange[1]
                } else {
                    columnRange[0] = Math.ceil((columnRange[0] + columnRange[1]) / 2)
                }
            }
            if (pass[index] === 'L') {
                if (index === 9) {
                    column = columnRange[0]
                } else {
                    columnRange[1] = Math.floor((columnRange[0] + columnRange[1]) / 2)
                }
            }
            index++
        }
        return (row * 8 + column)
    })
    seatIds.sort((a, b) => a - b)
    for (let i = 0; i < seatIds.length; i++) {
        if (seatIds[i+1] === (seatIds[i] + 2)) {
            return seatIds[i] + 1
        }
    }
}

const test = ['FFBBBFBLRL',
    'BFFFBFBRRR']

console.log(highestSeatId(test))
console.log(highestSeatId(input))

console.log(findSeatId(input))