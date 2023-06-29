import { Case } from "../db/schemas/Cases";

export class FindAllCasesRepository {
  async findAll() {
    try {
      const cases = await Case.find({});
      return cases;
    } catch (error) {
      throw Error("Failed to find cases: " + error);
    }
  }
}
