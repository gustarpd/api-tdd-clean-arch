import { Case } from "../db/schemas/Case";

export class CreateNewCaseUseCaseRepository {
  async save(properties) {
    return await Case.create(properties);
  }
}
