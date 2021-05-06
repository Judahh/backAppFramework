/* eslint-disable no-unused-vars */
export default interface ControllerOptionsAdapter {
  options(request, response): Promise<Response>;
}
