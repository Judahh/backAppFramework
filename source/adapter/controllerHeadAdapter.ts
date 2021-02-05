/* eslint-disable no-unused-vars */
export default interface ControllerHeadAdapter {
  head(request, response): Promise<Response>;
}
