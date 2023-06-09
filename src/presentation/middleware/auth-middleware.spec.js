import { AuthMiddleware } from "./auth-middleware";
import { HttpResponse } from "../helpers/httpReponse";

const loadAccountByTokenMock = {
  async loadUser(accessToken) {
    if (accessToken === "valid_token") {
      return { id: "account_id" };
    }
    return null;
  },
};

class LoadAccountByTokenWithError {
  async loadUser(accessToken) {
    if (!accessToken) {
      throw new Error("Same error");
    }

    return null;
  }
}

describe("AuthMiddleware", () => {
  describe("handle", () => {
    test("should return 401 if no access token is provided", async () => {
      const authMiddleware = new AuthMiddleware(loadAccountByTokenMock);
      const request = {};
      const response = await authMiddleware.handle(request);
      expect(response).toEqual(HttpResponse.unauthorizeError());
    });

    test("should return 200 with account ID if a valid access token is provided", async () => {
      const authMiddleware = new AuthMiddleware(loadAccountByTokenMock);
      const request = { accessToken: "valid_token" };
      const response = await authMiddleware.handle(request);
      expect(response).toEqual(HttpResponse.ok({ accountId: "account_id" }));
    });

    test("should return 401 if an invalid access token is provided", async () => {
      const authMiddleware = new AuthMiddleware(loadAccountByTokenMock);
      const request = { accessToken: "invalid-access-token" };
      const response = await authMiddleware.handle(request);
      expect(response).toEqual(HttpResponse.unauthorizeError());
    });
  });
});
