const faker = require("faker");
const lines = [
  "浦东1路",
  "浦东2路",
  "浦东33路",
  "浦东53路",
  "浦东62路",
  "7路",
  "119路",
  "911路",
  "62路(环路)",
].map(n => {
  return {
    id: faker.random.uuid(),
    name: n,
    description: String, // 线路描述
    ns: "/bus/core",
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.future().toISOString(),
    stations: [],
  };
});

module.exports = lines;
