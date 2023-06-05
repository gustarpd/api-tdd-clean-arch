import request from "supertest";
import app from "../config/app";

describe("Content-Type Middleware", () => {
  test("should return json content type as default", async () => {
    app.get("/text_content_type", (req, res) => {
      res.send("");
    });

    request(app).get("/text_content_type")
    .expect('content-type', /json/)
  });
});
