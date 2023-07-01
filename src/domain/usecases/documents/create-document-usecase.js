import { Document } from "../../entities/document";

export class AddDocumentUseCase {
  constructor(addDocumentRepository) {
    this.addDocumentRepository = addDocumentRepository;
  }

  async execute({ url, description, customer, title, owner }) {
    try {
      const document = Document.create({
        url,
        description,
        customer,
        title,
        owner,
      });
      const addDocument = await this.addDocumentRepository.add(document);
      return addDocument;
    } catch (error) {
      throw new Error(error);
    }
  }
}
