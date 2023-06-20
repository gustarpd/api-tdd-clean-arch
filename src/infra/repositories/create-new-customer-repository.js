import { Customer } from "../db/schemas/Customer";

export class CreateCustomerOffice {
    async create(data) {
      try {
        const customer = await Customer.create({
          name: data.name,
          address: data.name,
          email: data.email,
          cpfCnpj: data.cpfCnpj,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender,
          maritalStatus: data.maritalStatus,
          nationality: data.nationality,
          observations: data.observations,
          phone: data.phone,
          profession: data.profession,
        });
  
        return customer;
      } catch (error) {
        throw new Error("An unexpected error occurred");
      }
    }
  }