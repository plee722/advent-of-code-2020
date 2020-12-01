const fs = require("fs")
const filename = './day1.txt'
const input = fs.readFileSync(filename, 'utf8').split('\n').map(num => Number(num))

// Utilizes a hash table to check if a matching number has already been iterated over
function sum2020 (arr) {
    let record = {}
    for (let num of arr) {
        if (record[2020 - num] === num) {
            return num * (2020-num)
        }
        if ((2020-num) >= 0) {
            record[num] = (2020-num)
        }
    }
}

console.log(sum2020(input))