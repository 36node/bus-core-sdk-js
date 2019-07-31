const faker = require("faker");
const randomstring = require("randomstring");
const _ = require("lodash");
const moment = require("moment");

const producers = require("./producer");
const { State } = require("./constants");

const fakeString = (length, prefix = "FAKE") => {
  return `${prefix}${randomstring.generate({
    length: length,
    charset: "alphanumeric",
    capitalization: "uppercase",
  })}`;
};

const generate = (count, lines) =>
  _.range(count).map(val => {
    const producer = faker.random.arrayElement(producers);
    const model = faker.random.arrayElement(producer.models);
    const modelBrief = faker.random.arrayElement(producer.modelBriefs);
    const plateAt = moment(faker.date.past());
    const lifeYear = faker.random.number({ min: 8, max: 12 });
    const validTill = moment(plateAt).add(lifeYear, "years");
    const line = _.sample(lines);
    const id = fakeString(13);

    return {
      id, // 车辆 VIN 码
      vin: id, // 车辆vin码， 为了方便json-server查询
      brands: faker.company.companySuffix(), // 品牌
      capacity: faker.random.number({ min: 32, max: 64 }), // int32 额定载客人数
      emission: "UNKNOWN", //排放标准 c1~c3 国标I 国标II 国标III
      engineNo: fakeString(8), // 发动机编号
      iccid: fakeString(8), // 车辆 iccid 号
      length: faker.random.number({ min: 6, max: 16 }), // float 车辆长度
      lifeYear, // int32 使用年限
      line: line.id, // 线路
      model, // 车型
      modelBrief, // 车型简称
      modified: faker.random.boolean(), // 是否改装
      no: modelBrief + "-" + fakeString(4, ""), // 自编号
      place: faker.address.streetAddress(), // 停车位置
      plate: `沪${faker.random.arrayElement(["A", "B", "C", "D"])}${fakeString(
        5
      )}`, // 车牌
      plateAt: plateAt.toISOString(), // 上牌日期
      powerBy: faker.random.arrayElement(["纯电动", "混合动力"]), // 能源类型
      producer: producer.name, // 生产商
      purchaseAt: faker.date.past(), // 购买日期
      remark: faker.lorem.words(), // 备注
      scrapped: faker.random.boolean(), // 是否报废
      seats: faker.random.number({ min: 32, max: 64 }), // 座位数
      type: "大型普通客车", // 客车类型，例如大型普通客车
      validTill: validTill.toISOString(), // 报废日期
      ns: line.ns, // 所属ns
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.future().toISOString(),
      state: faker.random.arrayElement(State),
    };
  });

module.exports = generate;
