import { CustomerOffice } from "../clients-office.js";

describe("CpfErrorVaidation", () => {
  test("should true if cpf is invalid", () => {
    expect(CustomerOffice.isCpfValid("620-224-643-03")).toBe(true);
  });

  test("should return false if cpf is invalid", () => {
    expect(CustomerOffice.isCpfValid("620-224-643-13")).toBe(false);
  });

  test("should return false if cpf lenght is invalid", () => {
    const data = CustomerOffice.isCpfValid("875.414.80-59");
    expect(data).toBe(false);
  });

  test("should return false if cpf does not have pontuation", () => {
    const data = CustomerOffice.isCpfValid("8754148059");
    expect(data).toBe(false);
  });

  test("should return false if cpf contains repeated digits.", () => {
    const data = CustomerOffice.isCpfValid("11111111111");
    expect(data).toBe(false);
  });

  test("should return false if cpf contains repeated digits.", () => {
    expect(CustomerOffice.isCpfValid('123.456.789-01')).toBe(false);
  });
});
