import { MemoryServerMongo } from "./mongo-in-memory-server";

describe("Mongo Helper", () => {
  test("should recconect when getCollection if invoked and client is diconnected", async () => {
    const sut = new MemoryServerMongo();
    await sut.connect(process.env.MONGO_URL)
    expect(sut.db).toBeTruthy()
    await sut.disconnect()
    expect(sut.db).toBeFalsy()
    await sut.getCollection("users")
    expect(sut.db).toBeTruthy()
  });
});
