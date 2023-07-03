import { Document } from "../db/schemas/Document.js";
export class GetAllDocumentsRepository {
  async getAll() {
    try {
      const documents = await Document.find({});
      return documents;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
