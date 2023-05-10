
class EmailValidator {
    isValid(email) {
      return true
    }
}

describe("Email validator", () => {
  test("should return true if validator return true", () => {
    const sut = new EmailValidator();
    const isEmailValid = sut.isValid("valid_@email.com");
    expect(isEmailValid).toBe(true);
  });
});
