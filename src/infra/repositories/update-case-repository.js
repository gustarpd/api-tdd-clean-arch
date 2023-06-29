import { Case } from "../db/schemas/Cases.js";

export class UpdateCaseRepository {
  async editById({ ...data }) {
    try {
      const updatedCase = await Case.findOneAndUpdate(
        { _id: data.id },
        {
          $set: data,
        },
        { new: true }
      );
      return updatedCase;
    } catch (error) {
      throw new Error(error);
    }
  }
}
