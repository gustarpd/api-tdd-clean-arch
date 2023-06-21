import { Customer } from "../db/schemas/Customer.js";

export class CreateCustomerOfficeRepository {
    async create(data) {
      try {
        const customer = new Customer(data);
        await customer.save()
        return customer
      } catch (error) {
        throw new Error("An unexpected error occurred");
      }
    }
  }