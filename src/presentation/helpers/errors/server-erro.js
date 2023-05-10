export class ServerError extends Error {
  constructor(paramName) {
    super(`Inernal Erro`);
    this.name = "ServerError";
  }
}
