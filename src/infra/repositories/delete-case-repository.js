import { Case } from "../db/schemas/Cases.js";

export class DeleteCaseRepository {
  async deleteById(caseId) {
    try {
      return await Case.deleteOne({ _id: caseId });
    } catch (error) {
      throw new Error(error);
    }
  }
}
