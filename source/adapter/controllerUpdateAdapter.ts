/* eslint-disable no-unused-vars */
export default interface ControllerUpdateAdapter {
  update(request, response): Promise<Response>;
  forceUpdate(request, response): Promise<Response>;
}
