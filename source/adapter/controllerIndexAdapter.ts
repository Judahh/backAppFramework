/* eslint-disable no-unused-vars */
export default interface ControllerIndexAdapter {
  index(request, response): Promise<Response>;
}
