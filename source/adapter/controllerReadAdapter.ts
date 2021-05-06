/* eslint-disable no-unused-vars */
export default interface ControllerReadAdapter {
  read(request, response): Promise<Response>;
}
