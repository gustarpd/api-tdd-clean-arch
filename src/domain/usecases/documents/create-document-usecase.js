import { Document } from "../../entities/document.js";

export class AddDocumentUseCase {
  constructor(addDocumentRepository) {
    this.addDocumentRepository = addDocumentRepository;
  }

  async execute({ url, description, customerId, title, owner }) {
    try {
      console.log(customerId + "id usecase")
      const document = Document.create({ url, description, customerId, title, owner });
      const addDocument = await this.addDocumentRepository.add({ ...document, customerId });
      return addDocument;
    } catch (error) {
      throw new Error(error);
    }
  }
}
