import supertest from "supertest";
import app from "../config/app";
import bcrypt from 'bcrypt'
import { connect, disconnect } from '../../infra/helper/mongo-in-memory-server'
import { User } from '../../infra/db/schemas/Users'

describe("Login Routes", () => {
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
    supertest(app)
      .post("/api/login")
      .send({
        email: "valid_email@mail.com",
        password: bcrypt.hashSync("hashed_password", 10),
      })
      .expect(200);
  });
});
