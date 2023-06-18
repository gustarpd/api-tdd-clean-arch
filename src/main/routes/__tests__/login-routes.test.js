import supertest from "supertest";
import app from "../../config/app";
import bcrypt from "bcrypt";
import { connect, disconnect } from "../../../infra/helper/mongo-in-memory-server";
import { User } from "../../../infra/db/schemas/Users";

describe("Login Routes", () => {
  const testRequest = supertest(app);

  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  test("should return 200 when valid credencials are provided", async () => {
    await User.create({
      email: "valid_email@mail.com",
      password: "hashed_password",
    });
    await testRequest
      .post("/api/login")
      .send({
        email: "valid_email@mail.com",
        password: bcrypt.hashSync("hashed_password", 10),
      })
      .expect(200);
  });

  test("should return 401 when ivalid credencials are provided", async () => {
    await testRequest
      .post("/api/login")
      .send({
        email: "valid_email@mail.com",
        password: "hashed_password",
      })
      .expect(401);
  });
});
