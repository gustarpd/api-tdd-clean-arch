import { MissingParamError } from './missing-param-error'

export class HttpResponse {
  static badRequest(paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName),
    };
  }

  static InternalError() {
    return {
      statusCode: 500,
    };
  }
}
