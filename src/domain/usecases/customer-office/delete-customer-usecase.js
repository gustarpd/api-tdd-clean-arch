export class DeleteCustomerUseCase {
  constructor(deleteCustomerRepository) {
    this.deleteCustomerRepository = deleteCustomerRepository;
  }

  async execute(id) {
    const customer = await this.deleteCustomerRepository.deleteById(id);
    if (!customer) {
      return { success: false, message: "Falha ao excluír o cliente." };
    }
    return { success: true, message: "Cliente deletado com sucesso." };
  }
}
