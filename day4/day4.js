const fs = require("fs");
const filename = "./passports.txt";
const input = fs.readFileSync(filename, "utf8").split("\n\n");
const parsedInput = input.map((passport) => {
  const pairs = passport.split(/\n| /);
  const pairsArr = pairs.map((pair) => pair.split(":"));
  return new Map(pairsArr);
});

function validPassport(list) {
  let count = 0;
  const parsedPassports = list.map((passport) => passport.split(/\n| |:/));
  parsedPassports.forEach((passportArr) => {
    if (passportArr.length === 16) {
      count++;
    } else if (passportArr.length === 14 && !passportArr.includes("cid")) {
      count++;
    }
  });
  return count;
}

function validPassportWithValidation(list) {
  let count = 0;
  const colors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
  const lengths = ["cm", "in"];

  for (let parsedPassport of parsedInput) {
    const birthYear = Number(parsedPassport.get("byr"));
    const issueYear = Number(parsedPassport.get("iyr"));
    const expirationYear = Number(parsedPassport.get("eyr"));
    const height = [
      Number(
        parsedPassport.get("hgt") && parsedPassport.get("hgt").slice(0, -2)
      ),
      parsedPassport.get("hgt") && parsedPassport.get("hgt").slice(-2),
    ];
    const hairColor = parsedPassport.get("hcl");
    const eyeColor = parsedPassport.get("ecl");
    const passportId = parsedPassport.get("pid");

    if (
      parsedPassport.size === 8 ||
      (parsedPassport.size === 7 && !parsedPassport.has("cid"))
    ) {
      if (
        !birthYear ||
        birthYear.toString().length !== 4 ||
        birthYear < 1920 ||
        birthYear > 2002
      )
        continue;
      if (
        !issueYear ||
        issueYear.toString().length !== 4 ||
        issueYear < 2010 ||
        issueYear > 2020
      )
        continue;
      if (
        !expirationYear ||
        expirationYear.toString().length !== 4 ||
        expirationYear < 2020 ||
        expirationYear > 2030
      )
        continue;
      if (
        !(height.length > 0) ||
        !lengths.includes(height[1]) ||
        (height[1] === "cm" && (height[0] < 150 || height[0] > 193))
      )
        continue;
      if (
        !(height.length > 0) ||
        !lengths.includes(height[1]) ||
        (height[1] === "in" && (height[0] < 59 || height[0] > 76))
      )
        continue;
      if (
        hairColor.length !== 7 ||
        hairColor[0] !== "#" ||
        !hairColor.slice(1).match(/[a-f]|[0-9]/g)
      )
        continue;
      if (!colors.includes(eyeColor)) continue;
      if (passportId.length !== 9 || !passportId.match(/[0-9]/g)) continue;
      count++;
    }
  }

  return count;
}

console.log(validPassport(input))
console.log(validPassportWithValidation(input));
