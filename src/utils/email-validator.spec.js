class EmailValidator {
  isValid(email) {
    return email;
  }
}

const makeSut = () => {
  return new EmailValidator()
}

describe("Email validator", () => {
  test("should return true if validator return true", () => {
    const sut = makeSut()
    const isEmailValid = sut.isValid(true);
    expect(isEmailValid).toBe(true);
  });
  test("should return true if validator return true", () => {
    const sut = makeSut();
    const isEmailValid = sut.isValid(false);
    expect(isEmailValid).toBe(false);
  });
});
