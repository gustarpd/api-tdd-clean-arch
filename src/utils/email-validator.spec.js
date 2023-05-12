class EmailValidator {
  isValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
  }
}

const makeSut = () => {
  return new EmailValidator()
}

describe("Email validator", () => {
  test("should return true if validator return true", () => {
    const sut = makeSut()
    const isEmailValid = sut.isValid('valid_mail@mail.com');
    expect(isEmailValid).toBe(true);
  });
  test("should return true if validator return true", () => {
    const sut = makeSut();
    const isEmailValid = sut.isValid('invalid_mail.com');
    expect(isEmailValid).toBe(false);
  });
});
