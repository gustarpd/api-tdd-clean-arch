import { Document } from "../db/schemas/Document.js";

export class AddDocumentRepository {
  async add({ description, owner, url, title }) {
    try {
      const document = await Document.create({
        description,
        owner,
        url,
        title,
      });
      document.save();
      return document;
    } catch (error) {
      throw error; 
    }
  }
}
