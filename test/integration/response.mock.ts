let superC;

export const mockResponse = {
  received: {},
  error: {},
  status: (name) => {
    superC = this;
    return {
      send: (error) => {
        superC.error = {};
        if (this && error) superC.error[name] = error;
        return this;
      },
    };
  },
  json: (object) => {
    superC = this;
    superC.received = object;
    return this;
  },
};
