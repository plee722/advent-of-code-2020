const fs = require("fs");
const filename = "./trees.txt";
const input = fs
    .readFileSync(filename, "utf8")
    .split("\n")

function extendArr (arr) {
    return arr.map(elem => elem.repeat(300))
}


function countTrees (arr, rowChange, colChange) {
    let count = 0
    let rowIdx = 0
    let colIdx = 0
    arr = extendArr(arr)

    while (rowIdx < arr.length) {
        if (arr[rowIdx][colIdx] === '#') {
            count++
        }
        rowIdx += rowChange
        colIdx += colChange
    }
    return count
}

// expected is 2
const test = [
    '.......',
    '...#...',
    '......#'
]

function multiCount (arr, changes) {
    let product = 1
    changes.forEach(pair =>
    product *= countTrees(arr, pair[0], pair[1])
    )
    return product
}

console.log(countTrees(input, 1, 3))

const coordinates = [[1, 1], [1, 3], [1, 5], [1, 7], [2, 1]]
console.log(multiCount(input, coordinates))