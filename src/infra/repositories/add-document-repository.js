import {Customer} from "../db/schemas/Customer.js";
import {Document} from "../db/schemas/Document.js";

export class AddDocumentRepository {
  async add({ description, owner, url, title, customerId }) {
    try {
      const customer = await Customer.findOne({ _id: customerId });

      if (!customer) {
        throw new Error("Customer not found");
      }
      console.log(customerId)
      const document = new Document({
        description,
        owner,
        url,
        title,
        customer: customer._id
      });

      customer.documents.push(document);
      await customer.save();

      return document;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
