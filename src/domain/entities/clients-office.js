export class ClientsOffice {
  constructor({
    id,
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
    createdAt,
    updatedAt,
  }) {
    this.id = id;
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
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
