class CreateCustomerOffice {
  constructor(customerOfficeRepository) {
    this.customerOfficeRepository = customerOfficeRepository;
  }

  async execute({ ...customerData }) {
    try {
      const createNewCustomer = await this.customerOfficeRepository.create(
        CustomerOffice.create(customerData)
      );

      if (!createNewCustomer) {
        throw new Error("Unable to create customer in the database.");
      }

      return CustomerOffice.toData(createNewCustomer);
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  }
}
