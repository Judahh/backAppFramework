class MockResponse {
  received = {};
  error = {};
  status(name): { send: any } {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _self = this;
    return {
      send: (error) => {
        _self.error = {};
        if (this && error) _self.error[name] = error;
        return this;
      },
    };
  }
  json(object): MockResponse {
    this.received = object;
    return this;
  }
}

const mockResponse = new MockResponse();

export { mockResponse };
