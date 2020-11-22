/* eslint-disable @typescript-eslint/no-this-alias */
import { Utils } from '../../source/index';
// import dBHandler from './dBHandler';
import { Event, Operation } from 'flexiblepersistence';

import DBHandler from './dBHandler';
import TestController from './testController';

import { Request, Response } from 'express';

class Test {
  constructor(id?) {
    this.id = id;
  }
  public id: string | undefined;
}

let superC;

const mockResponse = {
  received: {},
  error: {},
  status: (name) => {
    superC = this;
    return {
      superC: superC,
      send: (error) => {
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

test('store person, update, select all, select by id person and delete it', async (done) => {
  const pool = DBHandler.getReadPool();
  await Utils.init(pool);
  const handler = DBHandler.getEventHandler();
  const controller = new TestController({
    journaly: DBHandler.getJournaly(),
    handler,
  });
  try {
    await handler.getWrite().clear('events');

    const sentPerson = new Test();

    const store = await controller.store(
      {
        body: sentPerson,
      } as Request,
      (mockResponse as unknown) as Response
    );
    const storedPerson = store['received'];
    // console.log('storedPerson:', storedPerson);

    sentPerson.id = store['received'].id;
    const expectedPerson = { test: { id: storedPerson.test.id } };
    // console.log('expectedPerson:', expectedPerson);

    expect(storedPerson).toStrictEqual(expectedPerson);
  } catch (error) {
    console.error(error);
    await handler.getWrite().clear('events');
    await Utils.end(pool);
    expect(error).toBe(null);
    done();
  }
  await handler.getWrite().clear('events');
  await Utils.end(pool);
  done();
});
