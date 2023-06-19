import { ClientsOffice } from "../clients-office.js";

describe("Clients Office", () => {
  const customerOffice = {
    id: 1,
    name: "John Doe",
    phone: "1234567890",
    email: "john@example.com",
    address: "123 Main Street",
    cpfCnpj: "123456789",
    dateOfBirth: "1990-01-01",
    gender: "Male",
    maritalStatus: "Single",
    profession: "Engineer",
    nationality: "Brazilian",
    observations: "Lorem ipsum dolor sit amet",
    createdAt: "2023-06-19",
    updatedAt: "2023-06-20",
  };

  test("should create Clients Office data", () => {
    const customerOfficeData = new ClientsOffice(customerOffice);
    expect(customerOfficeData).toEqual(customerOffice);
  });
});
