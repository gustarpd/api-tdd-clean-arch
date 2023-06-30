import { Case } from "../db/schemas/Cases";

export class DeleteCaseRepository {
  async deleteById(caseId) {
    try {
      return await Case.deleteOne({ _id: caseId });
    } catch (error) {
      throw new Error(error);
    }
  }
}
