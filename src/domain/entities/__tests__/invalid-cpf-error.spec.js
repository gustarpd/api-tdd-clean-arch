import { CustomerOffice } from "../clients-office.js";

describe("CpfErrorVaidation", () => {
  test("should throw CpfError if cpf is invalid", () => {
    expect(CustomerOffice.isCpfValid("620-224-643-03")).toBe(true);
  });

  test("should throw CpfError if cpf is invalid", () => {
    expect(CustomerOffice.isCpfValid("620-224-643-13")).toBe(false);
  });
});
