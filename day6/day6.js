const fs = require("fs");
const filename = "./answers.txt";
const input = fs.readFileSync(filename, "utf8").split("\n\n");

// console.log(input)

function sumValidAnswers(list) {
  // Counts for questions to which anyone in a group answered "yes"
  let count = 0;
  list.forEach((group) => {
    const combinedGroup = group.replace(/\n/g, "");
    const uniqueAnswers = new Set();
    for (let char of combinedGroup) {
      uniqueAnswers.add(char);
    }
    count += uniqueAnswers.size;
  });
  return count;
}

function alternateSumValidAnswers(list) {
  // Counts for questions to which everyone in a group answered "yes"
  let count = 0;
  list.forEach((group) => {
    const answerRecord = {};
    for (let char of group) {
      if (!answerRecord[char]) {
        answerRecord[char] = 1;
      } else {
        answerRecord[char]++;
      }
    }

    if (!answerRecord["\n"]) {
      count += group.length;
      return;
    }
    for (let key in answerRecord) {
      if (key !== "\n" && answerRecord[key] === answerRecord["\n"] + 1) {
        count++;
      }
    }
  });
  return count;
}

const test = ["ymw\nw\nwm\nvsw\nwm", "vs\nlqn\nti\nuvl"];
// 5 + 8 = 13
console.log(sumValidAnswers(test))
console.log(sumValidAnswers(input))

console.log(alternateSumValidAnswers(test));
console.log(alternateSumValidAnswers(input));
