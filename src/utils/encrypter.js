import bcrypt from "bcrypt";

export class Encrypter {
  async compare(value, hashed_value) {
    const isValid = bcrypt.compare(value, hashed_value);
    return isValid;
  }
}
