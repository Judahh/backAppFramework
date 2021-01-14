/* eslint-disable no-unused-vars */
export default interface ControllerDeleteAdapter {
  delete(request, response): Promise<Response>;
}
