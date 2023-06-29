import { Case } from "../db/schemas/Cases";

export class UpdateCaseRepository {
  async editById(data) {
    const updatedCase = await Case.findOneAndUpdate(
      { _id: data.id },
      {
        $set: {
          title: data.title,
          customer: data.customer,
          action_type: data.action_type,
          awarded_amount: data.awarded_amount,
          involved_parties: data.involved_parties,
          status: data.status,
          owner: data.owner,
          protocol: data.protocol,
          casedata: data.casedata,
          event: data.event,
        },
      },
      { new: true }
    );
    return updatedCase;
  }
}
