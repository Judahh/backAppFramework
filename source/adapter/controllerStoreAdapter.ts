/* eslint-disable no-unused-vars */
export default interface ControllerStoreAdapter {
  store(request, response): Promise<Response>;
}
