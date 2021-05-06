/* eslint-disable no-unused-vars */
export default interface ControllerTraceAdapter {
  trace(request, response): Promise<Response>;
}
