import { CustomerOffice } from "../../entities/clients-office.js";
import { InvalidParam } from "../../entities/errors/invalid-filed-error.js";


export class CreateCustomerOffice {
  constructor(customerOfficeRepository) {
    this.customerOfficeRepository = customerOfficeRepository;
  }

  async execute(customerData) {
    try {
      if(!customerData) {
        throw new Error('Unable to create customer in the database.')
      }
      const newCustomer = CustomerOffice.create(customerData);
      if(newCustomer instanceof InvalidParam) {
        return { error: newCustomer.message }
      }

      const createNewCustomer = await this.customerOfficeRepository.create(
        CustomerOffice.create(customerData)
      );

      return CustomerOffice.toData(createNewCustomer);
    } catch (error) {
      console.error(error)
      throw new Error(`Error: ${error.message}`);
    }
  }
}
