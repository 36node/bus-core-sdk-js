import SDK from "./index";

const sdk = new SDK({ base: "http://localhost:3000" });

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

  it("should list producers", async () => {
    const result = await sdk.producer.listProducers();
    expect(result.body.length).toBeGreaterThan(0);
  });
});
