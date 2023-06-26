import { Customer } from "../db/schemas/Customer.js";

export class DeleteCustomerRepository {
  async deleteById(id) {
    try {
      const delteCustomer = await Customer.findByIdAndDelete(id)
      return delteCustomer
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
}
