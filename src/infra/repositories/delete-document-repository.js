import { Document } from "../db/schemas/Document.js";

export class DeleteDocumentRepository {
  async deleteById(id) {
    try {
      return await Document.deleteOne({ _id: id });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
