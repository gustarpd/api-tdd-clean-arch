export class Case {
  constructor({
    title,
    customer,
    action_type,
    awarded_amount,
    involved_parties,
    status,
    owner,
    protocol,
    casedata,
    event,
  }) {
    this.title = title;
    this.customer = customer;
    this.status = status;
    this.owner = owner;
    this.protocol = protocol;
    this.casesData = casedata;
    this.event = event;
    this.action_type = action_type;
    this.awarded_amount = awarded_amount;
    this.involved_parties = involved_parties;
  }

  static create({
    title,
    customer,
    action_type,
    awarded_amount,
    involved_parties,
    status,
    owner,
    protocol,
    casedata,
    event,
  }) {
    return new Case({
      title,
      customer,
      status,
      action_type,
      awarded_amount,
      involved_parties,
      owner,
      protocol,
      casedata,
      event,
    });
  }
}
