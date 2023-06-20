import { ClientsOffice } from '../../entities/clients-office.js'

class CreateCustomerOffice {
  constructor(customerOfficeRepository) {
    this.customerOfficeRepository = customerOfficeRepository;
  }

  async execute({ ...customerData }) {

    const createNewCustomer = await this.customerOfficeRepository.create(new ClientsOffice(customerData))
    console.log(createNewCustomer)
  }
}

describe("Customer Office", () => {
  test("should", () => {
    const data = new CreateCustomerOffice
  });
});
