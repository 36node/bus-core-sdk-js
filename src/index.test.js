import faker from "faker";
import moment from "moment";

import SDK from "./index";

const sdk = new SDK({ base: "http://localhost:3000" });

const producer = {
  name: "万象",
  models: ["SXC6105GBEV", "SXC6120GHEV", "SXC6110GBEV3", "SXC6110GBEV7"],
  modelBriefs: ["W0E", "W2J", "W1C", "W1D"],
};

describe("## SDK vehicle", () => {
  it("should list lines", async () => {
    const result = await sdk.line.listLines();
    expect(result.body.length).toBeGreaterThan(0);
  });

  it("should list vehicles", async () => {
    const result = await sdk.vehicle.listVehicles({
      query: {
        limit: 10,
        offset: 0,
      },
    });
    expect(result.body.length).toEqual(10);
  });

  let vehicle;
  it("should create vehilce", async () => {
    const model = faker.random.arrayElement(producer.models);
    const modelBrief = faker.random.arrayElement(producer.modelBriefs);
    const plateAt = moment(faker.date.past());
    const lifeYear = faker.random.number({ min: 8, max: 12 });
    const validTill = moment(plateAt).add(lifeYear, "years");
    const line = {
      name: "test",
      description: "test line",
      ns: "/testbus",
      stations: [],
    };
    const vehicleToBeCreated = {
      brands: faker.company.companySuffix(), // 品牌
      capacity: faker.random.number({ min: 32, max: 64 }), // int32 额定载客人数
      emission: "UNKNOWN", //排放标准 c1~c3 国标I 国标II 国标III
      engineNo: "test string", // 发动机编号
      iccid: "test string", // 车辆 iccid 号
      length: faker.random.number({ min: 6, max: 16 }), // float 车辆长度
      lifeYear, // int32 使用年限
      line: line.name, // 线路
      model, // 车型
      modelBrief, // 车型简称
      modified: faker.random.boolean(), // 是否改装
      no: "TESTno1", // 自编号
      place: faker.address.streetAddress(), // 停车位置
      plate: "沪N066S4", // 车牌
      plateAt: plateAt.toISOString(), // 上牌日期
      powerBy: faker.random.arrayElement(["纯电动", "混合动力"]), // 能源类型
      producer: producer.name, // 生产商
      purchaseAt: "2019-02-03T21:59:09.687Z", // 购买日期
      remark: faker.lorem.words(), // 备注
      scrapped: faker.random.boolean(), // 是否报废
      seats: faker.random.number({ min: 32, max: 64 }), // 座位数
      type: "大型普通客车", // 客车类型，例如大型普通客车
      validTill: validTill.toISOString(), // 报废日期
      ns: line.ns, // 所属ns
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.future().toISOString(),
      state: "ONLINE",
    };
    const result = await sdk.vehicle.createVehicle({
      body: vehicleToBeCreated,
    });
    expect(result.body).toHaveProperty("id");
    expect(result.body).toMatchObject(vehicleToBeCreated);

    vehicle = result.body;
  });

  it("should get vehicle by Id", async () => {
    const result = await sdk.vehicle.getVehicle({ vehicleId: vehicle.id });
    expect(result.body.id).toBe(vehicle.id);
  });

  it("should update vehilce", async () => {
    const newPlate = "沪N066S5";
    const result = await sdk.vehicle.updateVehicle({
      vehicleId: vehicle.id,
      body: { plate: newPlate },
    });

    expect(result.body.id).toBe(vehicle.id);
    expect(result.body.plate).toBe(newPlate);
    expect(result.body.ns).toBe(vehicle.ns);
  });

  it("should delete vehile by id", async () => {
    await sdk.vehicle.deleteVehicle({ vehicleId: vehicle.id });
    try {
      await sdk.vehicle.getVehicle({ vehicleId: vehicle.id });
    } catch (err) {
      expect(err.status).toBe(404);
    }
  });

  it("should list producers", async () => {
    const result = await sdk.producer.listProducers();
    expect(result.body.length).toBeGreaterThan(0);
  });
});
