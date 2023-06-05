import { MissingParamError } from "./errors/missing-params-error.js";

export class EmailValidator {
  isValid(email) {
    if(!email) {
      throw new MissingParamError('email')
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
