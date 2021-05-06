/* eslint-disable no-unused-vars */
export default interface ControllerConnectAdapter {
  connect(request, response): Promise<Response>;
}
