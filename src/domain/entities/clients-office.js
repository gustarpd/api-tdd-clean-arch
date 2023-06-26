import { InvalidParam } from "./errors/invalid-filed-error.js";

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

  static isCpfValid(cpf) {
    if(!cpf) return 
    cpf = cpf.replace(/\D/g, "");

    if (cpf.length !== 11) {
      return false;
    }

    if (/^(\d)\1+$/.test(cpf)) {
      return false;
    }

    let sum = 0;
    let digit;
    const cpfDigits = cpf.split("").map(Number);

    for (let i = 0; i < 9; i++) {
      sum += cpfDigits[i] * (10 - i);
    }
    digit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (cpfDigits[9] !== digit) {
      return false;
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += cpfDigits[i] * (11 - i);
    }
    digit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (cpfDigits[10] !== digit) {
      return false;
    }

    return true;
  }

  static isValidValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static create(data) {
    if (!this.isCpfValid(data.cpfCnpj)) {
      return new InvalidParam("cpf");
    }

    if (!this.isValidValidEmail(data.email)) {
      return new InvalidParam("email");
    }
    return new CustomerOffice(data);
  }

  static toData(customer) {
    return customer;
  }
}
