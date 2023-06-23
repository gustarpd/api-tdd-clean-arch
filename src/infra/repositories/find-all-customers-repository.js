import { Customer } from "../db/schemas/Customer";

export class GetAllCustomerRepository {
  async findAllUsers() {
    try {
      const finduser = await Customer.find({});
      return finduser;
    } catch (error) {
      throw new Error(`Error: Failed to fetch customers.`);
    }
  }
}
