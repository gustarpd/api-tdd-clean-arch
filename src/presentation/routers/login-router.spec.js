class LoginRouter {
  route(httpRequest) {
    if(!httpRequest || !httpRequest.body) {
      return {
        statusCode: 500
      }
    }
    const { email, password } = httpRequest.body
    if (!email || !password) {
      return {
        statusCode: 400,
      };
    }
  }
}

describe("", () => {
  test("Should return 400 is no email provider", () => {
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        password: "any_password",
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });

  test("Should return 400 is no password provider", () => {
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        email: "any_email@mail.com",
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
  test('Should return 500 if no httpRequest is provider', () => {
    const sut = new LoginRouter();
    const httpResponse = sut.route();
    expect(httpResponse.statusCode).toBe(500);
  })
  test('Should return 500 if has no httpRequest is provider', () => {
    const sut = new LoginRouter();
    const httpResponse = sut.route({});
    expect(httpResponse.statusCode).toBe(500);
  })
});
