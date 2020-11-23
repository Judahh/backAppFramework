/* eslint-disable @typescript-eslint/no-this-alias */
import { Utils } from '../../source/index';
// import dBHandler from './dBHandler';

import DBHandler from './dBHandler';
import TestController from './testController';

import { Request, Response } from 'express';

class Test {
  constructor(id?) {
    this.id = id;
  }
  id: string | undefined;
  name: string | undefined;
}

let superC;

const mockResponse = {
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

test('store person, update, select all, select by id person and delete it', async (done) => {
  const pool = DBHandler.getReadPool();
  await Utils.init(pool);
  const handler = DBHandler.getEventHandler();
  const controller = new TestController(DBHandler.getInit());
  try {
    await handler.getWrite().clear('events');

    const sentPerson = new Test();
    const sentPerson2 = new Test();

    const store = await controller.store(
      ({
        body: sentPerson,
      } as unknown) as Request,
      (mockResponse as unknown) as Response
    );
    // console.log('store:', store);
    const storedPerson = store['received'];
    // console.log('storedPerson:', storedPerson);

    sentPerson.id = storedPerson.id;
    const expectedPerson = {
      test: { id: storedPerson.test.id, name: null },
    };
    // console.log('expectedPerson:', expectedPerson);

    expect(storedPerson).toStrictEqual(expectedPerson);

    const index = await controller.index(
      ({
        params: { filter: {} },
      } as unknown) as Request,
      (mockResponse as unknown) as Response
    );
    // console.log('show:', show);
    const indexPerson = index['received'];
    expect(indexPerson).toStrictEqual(expectedPerson);

    const store2 = await controller.store(
      ({
        body: sentPerson2,
      } as unknown) as Request,
      (mockResponse as unknown) as Response
    );
    // console.log('store:', store);
    const storedPerson2 = store2['received'];
    // console.log('storedPerson:', storedPerson);

    sentPerson2.id = storedPerson2.id;
    const expectedPerson2 = { test: { id: storedPerson2.test.id, name: null } };
    // console.log('expectedPerson:', expectedPerson);

    expect(storedPerson2).toStrictEqual(expectedPerson2);

    const show = await controller.show(
      ({
        params: { filter: {} },
      } as unknown) as Request,
      (mockResponse as unknown) as Response
    );

    const showPerson = show['received'];
    // console.log('showPerson:', showPerson);
    const expectedPersons = {
      test: [storedPerson.test, storedPerson2.test],
    };
    expect(showPerson).toStrictEqual(expectedPersons);

    const sentPerson3 = { name: 'Test' };

    const update = await controller.update(
      ({
        body: sentPerson3,
        params: {
          filter: { id: storedPerson2.test.id },
          single: false,
        },
      } as unknown) as Request,
      (mockResponse as unknown) as Response
    );
    // console.log('storedPerson2:', storedPerson2);

    const updatedPerson = update['received'];
    // console.log('updatedPerson:', updatedPerson);
    const expectedUpdatedPerson = {
      test: { id: storedPerson2.test.id, name: sentPerson3.name },
    };
    // console.log('expectedUpdatedPerson:', expectedUpdatedPerson);
    expect(updatedPerson).toStrictEqual(expectedUpdatedPerson);

    const show2 = await controller.show(
      ({
        params: { filter: {} },
      } as unknown) as Request,
      (mockResponse as unknown) as Response
    );

    const showPerson2 = show2['received'];
    // console.log('showPerson2:', showPerson2);
    const expectedPersons2 = {
      test: [storedPerson.test, updatedPerson.test],
    };
    // console.log('expectedPersons2:', expectedPersons2);

    expect(showPerson2).toStrictEqual(expectedPersons2);

    const deleted = await controller.delete(
      ({
        params: {
          filter: { id: storedPerson2.test.id },
        },
      } as unknown) as Request,
      (mockResponse as unknown) as Response
    );

    const deletedPerson = deleted['received'];
    // console.log('deletedPerson:', deletedPerson);
    const expectedDeletedPerson = {
      test: true,
    };
    // console.log('expectedDeletedPerson:', expectedDeletedPerson);
    expect(deletedPerson).toStrictEqual(expectedDeletedPerson);

    const show3 = await controller.show(
      ({
        params: { filter: {} },
      } as unknown) as Request,
      (mockResponse as unknown) as Response
    );

    const showPerson3 = show3['received'];
    // console.log('showPerson3:', showPerson3);
    const expectedPersons3 = {
      test: [storedPerson.test],
    };
    expect(showPerson3).toStrictEqual(expectedPersons3);
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
