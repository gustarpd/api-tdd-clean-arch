import { CustomerOffice } from '../../entities/clients-office'

export class GetAllCustomer {
  constructor(GetAllCustomerRepository) {
    this.GetAllCustomerRepository = GetAllCustomerRepository;
  }
  async execute() {
    try {
      const update = await this.GetAllCustomerRepository.getManyById();
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
