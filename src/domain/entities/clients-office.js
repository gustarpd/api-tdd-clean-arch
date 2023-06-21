export class CustomerOffice {
  constructor({
    name,
    phone,
    email,
    address,
    cpfCnpj,
    dateOfBirth,
    gender,
    maritalStatus,
    profession,
    nationality,
    observations,
  }) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.address = address;
    this.cpfCnpj = cpfCnpj;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.maritalStatus = maritalStatus;
    this.profession = profession;
    this.nationality = nationality;
    this.observations = observations;
  }

  static create(data) {
    return new CustomerOffice(data);
  }

  static toData(customer) {
    return customer;
  }
}
