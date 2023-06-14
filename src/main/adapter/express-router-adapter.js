export class ExpressRouterAdapter {
  static adapt(router) {
    return async (req, res) => {
      const httpRequest = {
        ...(req.body || {}),
        ...(req.params || {}),
      };
      const httpResponse = await router.handle(httpRequest);
      res.status(httpResponse.statusCode).json(httpResponse.body);
    };
  }
}
