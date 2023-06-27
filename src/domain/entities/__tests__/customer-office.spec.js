import { CustomerOffice } from "../clients-office.js";

describe("Clients Office", () => {
  const customerOffice = {
    name: "John Doe",
    phone: "875.414.840-59",
    email: "john@example.com",
    address: "123 Main Street",
    cpfCnpj: "875.414.840-59",
    dateOfBirth: "1990-01-01",
    gender: "Male",
    maritalStatus: "Single",
    profession: "Engineer",
    nationality: "Brazilian",
    observations: "Lorem ipsum dolor sit amet",
  };

  test("should return Customer Office object", () => {
    const data = CustomerOffice.create(customerOffice);
    expect(data).toEqual(customerOffice);
    expect(CustomerOffice.toData(data)).toEqual(customerOffice);
  });

  test("should return Customer Office object", () => {
    const data = CustomerOffice.isCpfValid('875.414.80-59');
    expect(data).toBe(false)
  });

  test("should return Customer Office object", () => {
    const data = CustomerOffice.isCpfValid('8754148059');
    expect(data).toBe(false)
  });
});
