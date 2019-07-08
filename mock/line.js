const faker = require("faker");

const lines = [
  "浦东1路",
  "浦东2路",
  "浦东33路",
  "浦东53路",
  "浦东62路",
  "7路",
  "62路",
  "88路",
  "16路",
  "22路",
  "33路",
  "119路",
  "911路",
  "411路",
  "611路",
  "62路(环路)",
  "52路(外环路)",
  "52路(内环路)",
  "63路",
  "89路",
  "17路",
  "23路",
  "34路",
  "120路",
  "912路",
  "412路",
  "612路",
];

const generate = nsArr =>
  lines.map((line, index) => {
    return {
      id: faker.random.uuid(),
      name: line,
      description: String, // 线路描述
      ns: nsArr[index % nsArr.length],
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.future().toISOString(),
      stations: [],
    };
  });

module.exports = generate;
