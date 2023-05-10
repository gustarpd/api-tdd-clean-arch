export class UnauthorizeError extends Error {
  constructor(paramName) {
    super(`unauthorize`);
    this.name = "UnauthorizeError";
  }
}
