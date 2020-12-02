const fs = require("fs");
const filename = "./passwords.txt";
const input = fs
  .readFileSync(filename, "utf8")
  .split("\n")
  .map((password) => password.replace(":", "").split(" "));

function numValid(list) {
  let valid = 0;
  for (let password of list) {
    const range = password[0].split("-");
    const min = range[0];
    const max = range[1];
    const targetChar = password[1];
    const passwordStr = password[2];
    let charCount = 0;

    for (let char of passwordStr) {
      if (char === targetChar) charCount++;
    }

    if ((charCount >= min && charCount <= max)) {
      valid++;
    }
  }

  return valid;
}

const test = [
  ["1-4", "g", "grog"],
  ["4-7", "h", "hwhwhhlg"],
  ["2-3", "k", "kkkktk"],
];

// expected is 2
// console.log(numValid(test))
// console.log(numValid(input))

function numValidTwo (list) {
    let count = 0;
    for (let password of list) {
        const positions = password[0].split("-");
        const position1 = positions[0];
        const position2 = positions[1];
        const targetChar = password[1];
        const passwordStr = password[2];
        let charCount = 0;

        if (passwordStr[position1 - 1] === targetChar) {
            charCount++
        }
        if (passwordStr[position2 - 1] === targetChar) {
            charCount++
        }

        if (charCount === 1) count++
    }

    return count;
}

console.log(numValidTwo(input))