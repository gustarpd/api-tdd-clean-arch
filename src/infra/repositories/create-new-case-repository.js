import { Case } from "../db/schemas/Cases.js";
import { Customer } from "../db/schemas/Customer.js";

export class CreateNewCaseUseCaseRepository {
  async save(properties) {
    
    const customer = await Customer.findOne({ _id: properties.customerId });
    
    const newCase = new Case({
      title: properties.title,
      action_type: properties.action_type,
      customerId: properties.customerId,
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
    console.log();
    return newCase;
  }
}
