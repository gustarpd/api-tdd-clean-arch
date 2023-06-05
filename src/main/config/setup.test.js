import request from "supertest";
import app from "./app.js";

describe("App setup", () => {
  test("should disable x-powered-by", async () => {
    app.get("/test_x_powered_by", (req, res) => {
      res.send("");
    });

    
    const res = await request(app).get('/test_x_powered_by')
    expect(res.headers['x-powered-by']).toBe(undefined)
  });

  test("should enable cors", async () => {
    app.get("/test_x_powered_by", (req, res) => {
      res.send("");
    });

    
    const res = await request(app).get('/test_x_powered_by')
    expect(res.headers['access-control-allow-origin']).toBe('*')
    expect(res.headers['access-control-allow-methods']).toBe('*')
    expect(res.headers['access-control-allow-headers']).toBe('*')
  });
});
