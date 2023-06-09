import bcrypt from "bcrypt";
import { MissingParamError } from "./errors/missing-params-error.js";

export class Encrypter {
  async compare(value, hashed_value) {
    if (!value || !hashed_value) {
      throw new MissingParamError("value");
    }
    const isValid = bcrypt.compare(value, hashed_value);
    return isValid;
  }

  async hash(value, salt) {
    if(!value || !salt) throw new MissingParamError("values")
    return bcrypt.hash(value, salt)
  }
}
