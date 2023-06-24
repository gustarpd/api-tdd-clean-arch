import { isValidCPF } from "../cpf-validator.js";
import { MissingParamError } from "../errors/missing-params-error";

describe("CPF validator", () => {
  test("should return true if validator return true", () => {
    const sut = isValidCPF('620.224.643-01')
    expect(sut).toBe(false) // invalid CPF
  });
  test("should return true if validator return true", () => {
    const sut = isValidCPF('123.456.789-09'); // Fake CPF
    expect(sut).toBe(true); // valid CPF
  });
});
