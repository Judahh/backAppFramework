/* eslint-disable no-unused-vars */
export default interface ControllerShowAdapter {
  show(request, response): Promise<Response>;
}
