import { CustomerOffice } from '../../entities/clients-office.js'

export class GetAllCustomer {
  constructor(GetAllCustomerRepository) {
    this.GetAllCustomerRepository = GetAllCustomerRepository;
  }
  async execute() {
    try {
      console.log(this.GetAllCustomerRepository)
      const update = await this.GetAllCustomerRepository.findAllUsers();
      if (!update) {
        return { message: "Nenhum cliente foi encontrado." };
      }
      return CustomerOffice.toData(update);
    } catch (error) {
      console.error(`Error: ${error}`);
      throw new Error("Error: Failed to fetch customers.");
    }
  }
}
