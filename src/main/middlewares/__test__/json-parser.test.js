import request from "supertest";
import app from "../../config/app";

describe("CORS middleware", () => {
  test("should parse body as json", async () => {
    app.get("/test_json_parser", (req, res) => {
      res.json(req.body);
    });

    
   request(app)
    .post('/test_json_parser')
    .send({ name: 'any_name' })
    .expect({ name: 'any_name' })
  });
});
