export class InvalidCpfError extends Error {
  constructor(paramName) {
    super(`Invalid param: ${paramName}`);
    this.name = "InvalidParamError";
  }
}
