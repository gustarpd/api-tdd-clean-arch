export class InvalidCpfError extends Error {
  constructor(paramName, message) {
    super(`Invalid param: ${paramName}`);
    this.name = "InvalidParamError";
    this.message = message || `Invalid param: ${paramName}`;
  }
}
