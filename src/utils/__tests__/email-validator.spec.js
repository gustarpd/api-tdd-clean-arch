import { EmailValidator } from "../email-validator";
import { MissingParamError } from "../errors/missing-params-error";

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

  test("Should throw if no email are provided", async () => {
    const sut = makeSut()
    expect(sut.isValid).toThrow(new MissingParamError('email'))
  });
});
