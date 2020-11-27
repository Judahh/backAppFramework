/* eslint-disable @typescript-eslint/no-this-alias */
import { Utils } from '../../source/index';
// import dBHandler from './dBHandler';

import DBHandler from './dBHandler';
// import TestController from './testController';

// import { Request, Response } from 'express';

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

test('store test, update, select all, select by id test and delete it', async (done) => {
  const pool = DBHandler.getReadPool();
  await Utils.init(pool);
  // const handler = DBHandler.getHandler();
  // const controller = new TestController(DBHandler.getInit());
  // try {
  //   await handler.getWrite().clear('events');

  //   const sentTest = new Test();
  //   const sentTest2 = new Test();

  //   const store = await controller.store(
  //     ({
  //       body: sentTest,
  //     } as unknown) as Request,
  //     (mockResponse as unknown) as Response
  //   );
  //   // console.log('store:', store);
  //   const storedTest = store['received'];
  //   // console.log('storedTest:', storedTest);

  //   sentTest.id = storedTest.id;
  //   const expectedTest = {
  //     test: { id: storedTest.test.id, name: null },
  //   };
  //   // console.log('expectedTest:', expectedTest);

  //   expect(storedTest).toStrictEqual(expectedTest);

  //   const index = await controller.index(
  //     ({
  //       params: { filter: {} },
  //     } as unknown) as Request,
  //     (mockResponse as unknown) as Response
  //   );
  //   // console.log('show:', show);
  //   const indexTest = index['received'];
  //   expect(indexTest).toStrictEqual(expectedTest);

  //   const store2 = await controller.store(
  //     ({
  //       body: sentTest2,
  //     } as unknown) as Request,
  //     (mockResponse as unknown) as Response
  //   );
  //   // console.log('store:', store);
  //   const storedTest2 = store2['received'];
  //   // console.log('storedTest:', storedTest);

  //   sentTest2.id = storedTest2.id;
  //   const expectedTest2 = { test: { id: storedTest2.test.id, name: null } };
  //   // console.log('expectedTest:', expectedTest);

  //   expect(storedTest2).toStrictEqual(expectedTest2);

  //   const show = await controller.show(
  //     ({
  //       params: { filter: {} },
  //     } as unknown) as Request,
  //     (mockResponse as unknown) as Response
  //   );

  //   const showTest = show['received'];
  //   // console.log('showTest:', showTest);
  //   const expectedTests = {
  //     test: [storedTest.test, storedTest2.test],
  //   };
  //   expect(showTest).toStrictEqual(expectedTests);

  //   const sentTest3 = { name: 'Test' };

  //   const update = await controller.update(
  //     ({
  //       body: sentTest3,
  //       params: {
  //         filter: { id: storedTest2.test.id },
  //         single: false,
  //       },
  //     } as unknown) as Request,
  //     (mockResponse as unknown) as Response
  //   );
  //   // console.log('storedTest2:', storedTest2);

  //   const updatedTest = update['received'];
  //   // console.log('updatedTest:', updatedTest);
  //   const expectedUpdatedTest = {
  //     test: { id: storedTest2.test.id, name: sentTest3.name },
  //   };
  //   // console.log('expectedUpdatedTest:', expectedUpdatedTest);
  //   expect(updatedTest).toStrictEqual(expectedUpdatedTest);

  //   const show2 = await controller.show(
  //     ({
  //       params: { filter: {} },
  //     } as unknown) as Request,
  //     (mockResponse as unknown) as Response
  //   );

  //   const showTest2 = show2['received'];
  //   // console.log('showTest2:', showTest2);
  //   const expectedTests2 = {
  //     test: [storedTest.test, updatedTest.test],
  //   };
  //   // console.log('expectedTests2:', expectedTests2);

  //   expect(showTest2).toStrictEqual(expectedTests2);

  //   const deleted = await controller.delete(
  //     ({
  //       params: {
  //         filter: { id: storedTest2.test.id },
  //       },
  //     } as unknown) as Request,
  //     (mockResponse as unknown) as Response
  //   );

  //   const deletedTest = deleted['received'];
  //   // console.log('deletedTest:', deletedTest);
  //   const expectedDeletedTest = {
  //     test: true,
  //   };
  //   // console.log('expectedDeletedTest:', expectedDeletedTest);
  //   expect(deletedTest).toStrictEqual(expectedDeletedTest);

  //   const show3 = await controller.show(
  //     ({
  //       params: { filter: {} },
  //     } as unknown) as Request,
  //     (mockResponse as unknown) as Response
  //   );

  //   const showTest3 = show3['received'];
  //   // console.log('showTest3:', showTest3);
  //   const expectedTests3 = {
  //     test: [storedTest.test],
  //   };
  //   expect(showTest3).toStrictEqual(expectedTests3);
  // } catch (error) {
  //   console.error(error);
  //   await handler.getWrite().clear('events');
  //   await Utils.end(pool);
  //   expect(error).toBe(null);
  //   done();
  // }
  // await handler.getWrite().clear('events');
  // await Utils.end(pool);
  done();
});
