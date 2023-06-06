export class UnauthorizeError extends Error {
  constructor(paramName) {
    super(`unauthorized`);
    this.name = "UnauthorizeError";
  }
}
