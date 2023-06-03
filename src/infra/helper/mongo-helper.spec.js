import { connect, cleanData, disconnect } from './mongo-in-memory-server'

describe("Mongo Helper", () => {
  let stopServer;
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    stopServer = await disconnect();
  });

  test("should toBeTruthy when connect db correctly", async () => {
    const sut = connect()
    expect(sut).toBeTruthy()
  });
  test('should toBeTruthy when db is closed correctly', async () => {
    const stopServer = disconnect()
    await expect(stopServer).toBeTruthy()
  })
});
