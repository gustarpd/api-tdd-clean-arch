import { Case } from "../db/schemas/Cases.js";

export class CreateNewCaseUseCaseRepository {
  async save(properties) {
    const newCase = new Case({
      title: properties.title,
      action_type: properties.action_type,
      awarded_amount: properties.awarded_amount,
      customer: properties.customer,
      casedata: properties.casedata,
      created_at: new Date(),
      event: properties.event,
      status: properties.status,
      owner: properties.owner,
      protocol: properties.protocol,
      involved_parties: properties.involved_parties
    });

    await newCase.save();

    return newCase;
  }
}
