export class Case {
  constructor({ title, customer, status, owner, protocol, casedata, history }) {
    this.title = title;
    this.customer = customer;
    this.status = status;
    this.owner = owner;
    this.protocol = protocol;
    this.casesData = casedata;
    this.history = history;
  }

  static create({
    title,
    customer,
    status,
    owner,
    protocol,
    casedata,
    history,
  }) {
    return new Case({
      title,
      customer,
      status,
      owner,
      protocol,
      casedata,
      history,
    });
  }

  static toData(customer) {
    return customer;
  }
}
